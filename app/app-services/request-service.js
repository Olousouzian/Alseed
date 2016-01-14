(function () {
    'use strict';
    angular.module('app.request', []);
    angular
        .module('app.request')
        .factory('RequestService', RequestService);

    RequestService.$inject = ['$q', '$http', '$location', 'API'];
    function RequestService($q, $http, $location, API) {
        var service = {};

        service.Get = Get;
        service.Post = Post;
        service.Put = Put;
        service.Delete = Delete;

        return service;

        function Get(url, params) {
            if (angular.isUndefined(params))
                params = {};

            var config = GetConfigObject('GET', url, params);
            return Request(config);
        }

        function Post(url, params, data) {
            var config = GetConfigObject('POST', url, params, data);
            return Request(config);
        }

        function Put(url, params, data) {
            var config = GetConfigObject('PUT', url, params, data);
            return Request(config);
        }

        function Delete(url, params, data) {
            var config = GetConfigObject('DELETE', url, params);
            return Request(config);
        }

        /* Private functions */

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