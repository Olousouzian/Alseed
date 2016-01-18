(function() {
    'use strict';
    /**
     * @memberof app
     * @ngdoc directive
     * @name alseedLanguage
     * @param {service} TranslateService manages to translate app
     * @param {ngcookie} manages cookie from app
     * @param permit to get currentLanguage saving
     * @description
     * Call InitTranslate from TranslateService with param alseedLanguage and  put current language on cookie.
     */
    angular.module('app')
        .directive('alseedLanguage', ['TranslateService', '$cookieStore', '$rootScope', function(TranslateService, $cookieStore, $rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.on('click', function() {
                        TranslateService.InitTranslate(attrs.alseedLanguage).then(function(response) {
                            if (response.success === true) {
                                $rootScope.currentLanguage = attrs.alseedLanguage;
                                $cookieStore.put('language', attrs.alseedLanguage);
                            }
                        });
                    });
                }
            }
        }]);
})();