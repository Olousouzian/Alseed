(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.message
     */
    angular.module('app.message', []);
    angular
        .module('app.message')
        .factory('MessageService', MessageService);
    /**
     * @memberof app.message
     * @ngdoc service
     * @name MessageService
     * @param $q Permit to instanciate a promise
     * @param $http Permit to call API.
     * @description This service manages message on timeline. Permit to define a message and  if push must be sending.
     */
    MessageService.$inject = ['$q','$http'];
    function MessageService($q,$http) {
        var service = {};

        service.GetAllMessage = GetAllMessage;
        service.GetOneMessage = GetOneMessage;
        service.Update = Update;
        service.Delete = Delete;
        service.Add = Add;
        return service;
        /**
         * Function to get all message
         * @memberof MessageService
         */
        function GetAllMessage() {
            var deffered = $q.defer();
            var route = '/message/allMessage';
            var params = {};

            $http.get(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                success.data = data.data;
                deffered.resolve(success);
            });
            return deffered.promise;
        }
        /**
         * Function to get one message.
         * @memberof MessageService
         * @param {int} id id from Message
         */
        function GetOneMessage(id){
            var deffered = $q.defer();

            GetAllMessage().then(function(response) {
                if (response.success === true) {
                    for (var i=0; i < response.data.length; i++) {
                        if (Number(response.data[i].id) === Number(id)) {
                            var success = Object.clone(SuccessResponse);
                            success.data = response.data[i];
                            deffered.resolve(success);
                            break;
                        }
                    }

                    var error = Object.clone(ErrorResponse);
                    deffered.reject(error);
                } else {
                    var error = Object.clone(ErrorResponse);
                    deffered.reject(error);
                }
            });
            return deffered.promise;
        }
        /**
         * Function to update a message
         * @memberof MessageService
         * @param {array} message new message + id
         */
        function Update(message) {
            var deffered = $q.defer();
            var route = '/message/updateMessage';
            var params = {message : message};
            $http.post(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                deffered.resolve(success);
            });

            return deffered.promise;
        }
        /**
         * Function to delete a message
         * @memberof MessageService
         * @param {int} id
         */
        function Delete(id) {
            var deffered = $q.defer();

            if (angular.isUndefined(id) === true) {
                var error = Object.clone(ErrorResponse);
                error.message = 'MessageService.Delete : Missing id';
                deffered.reject(error);
            } else {
                var route = '/message/deleteMessage';
                var params = {id : id};

                $http.get(route, params).then(function(data) {
                  var success = Object.clone(SuccessResponse);
                  deffered.resolve(success);
                });

            }

            return deffered.promise;
        }
        /**
         * Function to add  message
         * @memberof MessageService
         * @param {array} message info from message
         */
        function Add(message) {
            var deffered = $q.defer();
            var route = '/message/addMessage';
            var params = {message: message};
            $http.post(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                success.data = data.data;
                deffered.resolve(success);
            });

            return deffered.promise;
        }
    }
})();