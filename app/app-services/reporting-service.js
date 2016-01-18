(function () {
    'use strict';
    angular.module('app.reporting', []);
    angular
        .module('app.reporting')
        .factory('ReportingService', ReportingService);

    ReportingService.$inject = ['$q', '$http'];
    function ReportingService($q, $http) {
        var service = {};

        service.DownloadInfo = DownloadInfo;

        return service;

        // Public functions
        function DownloadInfo() {
            var route = '/reporting/download';
            var params = {};
            var deffered = $q.defer();
            $http.get(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                success.data = data.data;
                deffered.resolve(success);
            });

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