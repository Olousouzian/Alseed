(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.translate
     */
    angular.module('app.translate', []);
    angular
        .module('app.translate')
        .factory('TranslateService', TranslateService);
    /**
     * @memberof app.translate
     * @ngdoc service
     * @name TranslateService
     * @param $http Permit to call API
     * @param $cookistore Permit to set user info on cookie
     * @param $rootScope Manages info from scope parent
     * @param $q Manage promise
     * @param LANGUAGE Constant contain language
     * @param RequestService Other way to call API
     */
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
        /**
         * Function use to get language by default or choose by user and get file translate (app/assets/translate/"file")
         * @memberof TranslateService
         * @param {string} lang to know which lang using
         */
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
                    RequestService.Get('translate/' + lang + '.po').then(function (response) {
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
        /**
         * Get translate of phrase
         * @memberof TranslateService
         * @param {string} input phrase to translate
         * @param {array} args variable link with phrase to note translate
         */
        function GetTranslate(input, args) {
            var trans = undefined;
            if (angular.isUndefined(currentLang[$rootScope.currentLanguage]) === false) {
                var str = 'msgid "' + input + '"\nmsgstr "((?:.|)*?)"';
                var sResult = currentLang[$rootScope.currentLanguage].match(str);
                if (sResult !== null) {
                    trans = sResult[1];
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
            }
            return input;
        }
        /**
         * Function use to get all languages available
         * @memberof TranslateService
         */
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
        /**
         * Clear info translate from cache
         * @memberof ClearCache
         */
        function ClearCache(){
            currentLang = {};
            $rootScope.currentLanguage = null;
            $cookieStore.remove('language');
        }
    }
})();