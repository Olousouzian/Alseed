(function(){
    'use strict';

    angular.module('app')
        .filter('translate', translateFilter)

    translateFilter.$inject = ['TranslateService'];
    
    function translateFilter(TranslateService) {
        
        function translateFilter(input, args) {
            return TranslateService.GetTranslate(input, args);
        }

        translateFilter.$stateful = true;
        return translateFilter;
    }
})();