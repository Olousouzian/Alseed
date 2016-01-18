(function () {
    'use strict';
    angular.module('app.theme', []);
    angular
        .module('app.theme')
        .factory('ThemeService', ThemeService);

    ThemeService.$inject = ['$q', '$http', '$rootScope', '$cookieStore'];
    function ThemeService($q, $http , $rootScope, $cookieStore) {
        var service = {};

        service.ApplyTheme = ApplyTheme;
        service.ClearCache = ClearCache;
        var themeLoad = {};

        return service;

        // Public functions
        function ApplyTheme(id){

            var deffered = $q.defer();

            $rootScope.theme = {
                themeMark: true, 
                path: undefined
            };

            /*Fake Result*/
            if (!(id in themeLoad)) {
                var success = Object.clone(SuccessResponse);
                success.data = "css/" + id + "/app" + id + ".css";
                themeLoad[id] = success;
                $rootScope.theme.path = success.data;
                deffered.resolve(success);
            } else {
                deffered.resolve(themeLoad[id]);
            }

            $cookieStore.put('theme', $rootScope.theme);
            return deffered.promise;
        }
        function ClearCache(){
            $rootScope.themeMark =false;
            $rootScope.path="";
            themeLoad = {};
            $rootScope.theme = {};
        }

    }

})();