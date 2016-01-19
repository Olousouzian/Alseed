(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.cache
     */
    angular.module('app.cache', []);
    angular
        .module('app.cache')
        .factory('CacheService', CacheService)
        .factory('AuthenticationService', AuthenticationService);
    /**
     * @memberof app.cache
     * @ngdoc service
     * @name CacheService
     * @param UserService To delete info user from cache
     * @param TranslateService To delete info translate from cache
     * @param ThemeService To delete info theme from cache
     * @description This service permit to delete info from cache
     */
    CacheService.$inject = ['UserService', 'TranslateService', 'ThemeService'];
    function CacheService(UserService, TranslateService, ThemeService) {
        var service = {};

        service.ClearAllCache = ClearAllCache;


        return service;
        /**
         * Function To clear cache from all service inject on this service.
         * @memberof CacheService
         */
        function ClearAllCache(){
            UserService.ClearCache();
            TranslateService.ClearCache();
            ThemeService.ClearCache();
        }
    }

})();