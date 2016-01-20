(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.push
     */
    angular.module('app.push', []);
    angular
        .module('app.push')
        .factory('PushService', PushService);
    /**
     * @memberof app.push
     * @ngdoc service
     * @name PushService
     * @param $q Manages promise
     * @param $http Permit to call API
     */
    PushService.$inject = ['$q', '$http'];
    function PushService($q, $http) {
        var service = {};

        service.SendNotification = SendNotification;

        return service;
        /**
         * Function to send a push on device
         * @memberof PushService
         * @param object Object with info to send  a push
         */
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
