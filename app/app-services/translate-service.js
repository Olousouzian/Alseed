(function () {
    'use strict';
    angular.module('app.translate', []);
    angular
        .module('app.translate')
        .factory('TranslateService', TranslateService);

    TranslateService.$inject = ['$q', '$http', '$rootScope', 'LANGUAGE', '$cookieStore', 'RequestService'];
    function TranslateService($q, $http, $rootScope, LANGUAGE, $cookieStore, RequestService) {
        var service = {};
        service.InitTranslate = InitTranslate;
        service.GetTranslate = GetTranslate;
        service.ClearCache = ClearCache;
        service.GetLanguages = GetLanguages;
        
        // Local storage
        var currentLang = {};

        return service;

        function InitTranslate(lang) {
            var deffered = $q.defer();
            GetLanguages().then(function(response) {
                var exists = false;

                angular.forEach(response.data, function(language) {
                    if (lang === language.code) {
                        exists = true;
                        return false;
                    }
                });

                if (exists === false) {
                    lang = LANGUAGE.DEFAULT;
                }

                if (!(lang in currentLang)) {
                    RequestService.Get('/translate/' + lang + '.json').then(function (response) {
                        var success = Object.clone(SuccessResponse);
                        if (response.success === true) {
                            currentLang[lang]=response.data;
                            $rootScope.currentLanguage = lang;
                            $cookieStore.put('language', $rootScope.currentLanguage);
                            success.data = currentLang[lang];
                        }
                        deffered.resolve(success);
                    });
                } else {
                    var success = Object.clone(SuccessResponse);
                    success.data = currentLang[lang];

                    deffered.resolve(success);
                }
            });

            return deffered.promise;
        }

        function GetTranslate(input, args) {
            // build translation with args
            // search for %ns occurencies
            var trans = undefined;
            
            if (angular.isUndefined(currentLang[$rootScope.currentLanguage]) === false) {
                trans = currentLang[$rootScope.currentLanguage][input];
            
                if (angular.isUndefined(trans) === false) {
                    if (angular.isUndefined(args) === false) {
                        var occurencies = trans.match(/%(\d+)s/ig);
                        angular.forEach(occurencies, function (occurence, key) {
                            var index = occurence.replace('%', '').replace('s', '');
                            trans = trans.replace(occurencies[key], args[index - 1]);
                        });
                    }
                    return trans;
                }
            }
            
            return input;
        }

        function GetLanguages() {
            var deffered = $q.defer();

            var route = '/translate/allLanguage';
            var params = {};
            var deffered = $q.defer();
            $http.get(route, params).then(function(data) {

                var success = Object.clone(SuccessResponse);
                success.data = data.data;
                deffered.resolve(success);
            });
            return deffered.promise;
        }

        function ClearCache(){
            currentLang = {};
            $rootScope.currentLanguage = null;
            $cookieStore.remove('language');
        }
    }
})();