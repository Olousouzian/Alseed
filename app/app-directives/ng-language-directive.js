(function() {
    'use strict';

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