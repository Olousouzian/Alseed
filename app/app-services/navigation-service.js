(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.navigation
     */
    angular.module('app.navigation', []);
    angular
        .module('app.navigation')
        .factory('NavigationService', NavigationService);
    /**
     * @memberof app.navigation
     * @ngdoc service
     * @name NavigationService
     * @param $q Manages a promise
     * @param RequestService Other way to call API with response with detail structure
     * @param $http Permit to call API
     * @description Service manages order and wording from menu
     */
    NavigationService.$inject = ['$q', 'RequestService', '$http'];
    function NavigationService($q, RequestService, $http) {
        var service = {};

        service.GetNav = GetNav;
        service.PostNav = PostNav;

        return service;
        /**
         * Function to get menu
         * @memberof NavigationService
         */
        function GetNav() {
            var deffered = $q.defer();
            var route = '/navigation/getNavigation';
            var params = {};
            var deffered = $q.defer();
            $http.get(route, params).then(function(data) {
                var response = Object.clone(SuccessResponse);
                response.data = data.data;
                deffered.resolve(response);
            });

            return deffered.promise;
        }
        /**
         * Function To set new order or wording about menu
         * @memberof NavigationService
         */
        function PostNav(navigation) {
            var deffered = $q.defer();

            RequestService.Post('', {}, navigation).then(function(response) {
                deffered.resolve(response);
            });

            return deffered.promise;
        }
    }
})();