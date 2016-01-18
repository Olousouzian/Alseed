(function(){
    'use strict';
    /**
     * @memberof app
     * @ngdoc filter
     * @name translateFilter
     * @param {service} TranslateService
     */
    angular.module('app')
        .filter('translate', translateFilter)

    translateFilter.$inject = ['TranslateService'];
    /**
     * @memberof translateFilter
     * @param {service} TranslateService
     * @description Call translateFilter. CHnage value from translateService.stateful to true and return translateFilter
     */
    function translateFilter(TranslateService) {

        /**
         * @memberof translateFilter
         * @param {string} input
         * @param {array} args multiple argument to put on translate
         * @description Call GetTranslate from TranslateService with param input and arg to get the translation of input
         */
        function translateFilter(input, args) {
            return TranslateService.GetTranslate(input, args);
        }

        translateFilter.$stateful = true;
        return translateFilter;
    }
})();