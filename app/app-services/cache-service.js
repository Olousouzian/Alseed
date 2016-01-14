(function () {
    'use strict';
    angular.module('app.cache', []);
    angular
        .module('app.cache')
        .factory('CacheService', CacheService);

    CacheService.$inject = ['UserService', 'TranslateService', 'ThemeService'];
    function CacheService(UserService, TranslateService, ThemeService) {
        var service = {};

        service.ClearAllCache = ClearAllCache;


        return service;

        // Public functions
        function ClearAllCache(){
            UserService.ClearCache();
            TranslateService.ClearCache();
            ThemeService.ClearCache();
        }
    }

})();