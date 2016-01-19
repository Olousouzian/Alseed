(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.request
     */
    angular.module('app.request', []);
    angular
        .module('app.request')
        .factory('RequestService', RequestService);
    /**
     * @memberof app.request
     * @ngdoc service
     * @name RequestService
     * @param $q Manages promise
     * @param $http Permit to call API
     * @param $location Permit to redirect on different path
     */
    RequestService.$inject = ['$q', '$http', '$location', 'API'];
    function RequestService($q, $http, $location, API) {
        var service = {};

        service.Get = Get;
        service.Post = Post;
        service.Put = Put;
        service.Delete = Delete;

        return service;
        /**
         * Function to get config from object due to url and params
         * @memberof RequestService
         * @param {string} url
         * @param {object} params
         */
        function Get(url, params) {
            if (angular.isUndefined(params))
                params = {};

            var config = GetConfigObject('GET', url, params);
            return Request(config);
        }
        /**
         * Function to set data from object due to url and params
         * @memberof RequestService
         * @param {string} url
         * @param {object} params
         * @param {object} data contains info to push on server
         */
        function Post(url, params, data) {
            var config = GetConfigObject('POST', url, params, data);
            return Request(config);
        }
        /**
         * Function to put data from object due to url and params
         * @memberof RequestService
         * @param {string} url
         * @param {object} params
         * @param {object} data
         */
        function Put(url, params, data) {
            var config = GetConfigObject('PUT', url, params, data);
            return Request(config);
        }
        /**
         * Function to delete data from object due to url and params
         * @memberof RequestService
         * @param {string} url
         * @param {object} params
         * @param {object} data
         */
        function Delete(url, params, data) {
            var config = GetConfigObject('DELETE', url, params);
            return Request(config);
        }
        /**
         * Function to call API and manage info
         * @memberof RequestService
         * @param {object} config contain type of call (POST, GET...) data to push, params and  url
         */
        function Request(config) {
            var deffered = $q.defer();
            $http(config).then(function(response) {
                if (response.status === 200) {
                    var success = Object.clone(SuccessResponse);
                    success.data = response.data;
                    deffered.resolve(success);
                } else {
                    // Handle error codes
                    if (response.status === 404) {
                        $location.path('/not-found');
                    }

                    var error = Object.clone(ErrorResponse);
                    error.message = response.data || 'Request failed';
                    deffered.reject(error);
                }
            }, function(response) {
                var error = Object.clone(ErrorResponse);
                error.message = response.data || 'Request failed';
                deffered.reject(error);
            });

            return deffered.promise;
        }
        /**
         * Function to return config usinf  on request function
         * @memberof RequestService
         * @param {string} method type call
         * @param {string} url
         * @param {object} params
         * @param {object} data
         */
        function GetConfigObject(method, url, params, data) {
            // Set version
            var version = API.DEFAULT_VERSION;
            
            if (angular.isUndefined(params) === false && angular.isUndefined(params.version) === false) {
                var version = params.version;
                delete params[version];
            }

            var config = {
                method: method,
                url: url,
                params: params,
                headers: {
                    'Accept': 'version: ' + version
                }
            };

            if (angular.isUndefined(data) === false)
                config.data = data;

            return config;
        }
    }
})();