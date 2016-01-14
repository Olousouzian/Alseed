(function () {
    'use strict';
    angular.module('app.terms', []);
    angular
        .module('app.terms')
        .factory('TermsService', TermsService);

    TermsService.$inject = ['$q'];
    function TermsService($q) {
        var service = {};

        service.Save = Save;
        return service;

        // Public functions
        function Save (terms) {
            var deffered = $q.defer();
            var success = Object.clone(SuccessResponse);
            success.data = terms;
            deffered.resolve(success);

            /* Real WebServices
             // WS Parameters
             var route = '/api/user/terms';
             var params = {};

             RequestService.Get(route, params).then(function(response) {
             deffered.resole(response);
             });
             */

            return deffered.promise;
        }
    }
})();