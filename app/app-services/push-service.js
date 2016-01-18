(function () {
    'use strict';
    angular.module('app.push', []);
    angular
        .module('app.push')
        .factory('PushService', PushService);

    PushService.$inject = ['$q', '$http'];
    function PushService($q) {
        var service = {};

        service.SendNotification = SendNotification;

        return service;

        // Public functions
        function SendNotification(object){

            var deffered = $q.defer();

            var route = '/push/send';
            var params = {object : object};

            $http.post(route, params).then(function(data){
                deffered.resolve(data);
            }, function(status) {
                deffered.reject(status);
            });

            return deffered.promise;
        }

    }

})();
