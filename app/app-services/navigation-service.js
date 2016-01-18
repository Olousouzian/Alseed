(function () {
    'use strict';
    angular.module('app.navigation', []);
    angular
        .module('app.navigation')
        .factory('NavigationService', NavigationService);

    NavigationService.$inject = ['$q', 'RequestService', '$http'];
    function NavigationService($q, RequestService, $http) {
        var service = {};

        service.GetNav = GetNav;
        service.PostNav = PostNav;

        return service;

        // Public functions
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

        function PostNav(navigation) {
            var deffered = $q.defer();

            RequestService.Post('', {}, navigation).then(function(response) {
                deffered.resolve(response);
            });

            return deffered.promise;
        }
    }
})();