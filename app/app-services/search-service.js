(function () {
    'use strict';
    angular.module('app.search', []);
    angular
        .module('app.search')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$q', '$injector', '$cookieStore', '$rootScope'];
    function SearchService($q, $injector, $cookieStore, $rootScope) {
        var service = {};

        service.Search = Search;

        initService();      

        return service;

        /**
         * initService()
         *
         * @return void
         */
        function initService() {
            $rootScope.availableSearchProviders = _getAvailableSearchProviders();

            // Check for each service if search method is defined
            angular.forEach($rootScope.availableSearchProviders, function(provider, key) {
                var serviceInstance = $injector.get(provider);

                // If service is not defined or _search function does not exists, remove provider
                if (typeof serviceInstance !== 'object' || typeof serviceInstance.Search !== 'object') {
                    $rootScope.availableSearchProviders.slice(key, 1);
                }
            });
        }

        /**
         * Search() returns results hash
         *
         * @param {string} expression
         * @param {object} options
         * @return {object} results
         */
        function Search(expression, options) {
            var deffered = $q.defer();

            try {
                if (!expression)
                    throw "Expression cannot be empty !";

                var defaultOptions = _getDefaultOptions();
                options = angular.extend({}, defaultOptions, options);
                options.length = (options.services.length > 0 && options.length >= options.services.length ? Math.floor(options.length / options.services.length) : defaultOptions.length)
                var promises = [];

                angular.forEach(options.services, function(service) {
                    if (_checkAvailability(service) === false) {
                        throw "Service " + service + " is not available for search !"; 
                    }

                    var serviceInstance = $injector.get(service);

                    if (typeof(serviceInstance.Search) !== 'function') {
                        throw "Service " + service + " is not configured for search !";
                    }

                    var promise = serviceInstance.Search(expression, {
                        order: options.order,
                        length: options.length,
                        offset: options.offset
                    });

                    promises.push(promise);
                });

                $q.all(promises).then(function(datas) {
                    var success = Object.clone(SuccessResponse);
                    success.data = datas;
                    deffered.resolve(success);
                });
            } catch(err) {
                var error = Object.clone(ErrorResponse);
                error.message = "SearchService : " + err;
                
                deffered.reject(error);
            }

            return deffered.promise;
        }

        // Private functions
        /**
         * _getAvailableSearchProviders() returns list of services
         * 
         * @return {array}
         */
        function _getAvailableSearchProviders() {
            return ['UserService', 'NewsService', 'MediaService'];
        }

        /**
         * _checkAvailability() returns boolean
         *
         * @param {string} service
         * @return {boolean|object} result
         */
        function _checkAvailability(service) {
            if ($rootScope.availableSearchProviders.indexOf(service) !== -1) {
                return true;
            }

            return false;
        }

        /**
         * _getDefaultOptions()
         *
         * @return {object}
         */
        function _getDefaultOptions() {
            return {
                'services': $rootScope.availableSearchProviders,
                'length': '10', // Total length of results (divide by services count)
                'offset': 0,
                'order': 'natural'
            };
        }
    }
})();