(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.theme
     */
    angular.module('app.theme', []);
    angular
        .module('app.theme')
        .factory('ThemeService', ThemeService);
    /**
     * @memberof app.theme
     * @ngdoc service
     * @name SearchService
     * @param $http Permit to call API
     * @param $cookistore Permit to set user info on cookie
     * @param $rootScope Manages info from scope parent
     * @param $q Manages promise
     */
    ThemeService.$inject = ['$q', '$http', '$rootScope', '$cookieStore'];
    function ThemeService($q, $http , $rootScope, $cookieStore) {
        var service = {};

        service.ApplyTheme = ApplyTheme;
        service.ClearCache = ClearCache;
        var themeLoad = {};

        return service;

        /**
         * Function to apply theme from id
         * @memberof ThemeService
         * @param {int} id
         */
        function ApplyTheme(id){

            var deffered = $q.defer();

            $rootScope.theme = {
                themeMark: true, 
                path: undefined
            };

            /*Fake Result*/
            if (!(id in themeLoad)) {
                var success = Object.clone(SuccessResponse);
                success.data = "themes/" + id + "/css/app" + id + ".css";
                themeLoad[id] = success;
                $rootScope.theme.path = success.data;
                deffered.resolve(success);
            } else {
                deffered.resolve(themeLoad[id]);
            }

            $cookieStore.put('theme', $rootScope.theme);
            return deffered.promise;
        }
        /**
         * Function to clear theme from cache
         * @memberof ThemeService
         */
        function ClearCache(){
            $rootScope.themeMark =false;
            $rootScope.path="";
            themeLoad = {};
            $rootScope.theme = {};
        }

    }

})();