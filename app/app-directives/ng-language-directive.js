(function() {
    'use strict';

    angular.module('app')
        .directive('mydppLanguage', ['TranslateService', '$cookieStore', '$rootScope', function(TranslateService, $cookieStore, $rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.on('click', function() {
                        TranslateService.InitTranslate(attrs.mydppLanguage).then(function(response) {
                            if (response.success === true) {
                                $rootScope.currentLanguage = attrs.mydppLanguage;
                                $cookieStore.put('language', attrs.mydppLanguage);
                            }
                        });
                    });
                }
            }
        }]);
})();