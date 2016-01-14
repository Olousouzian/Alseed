(function () {
    'use strict';
    angular.module('app.message', []);
    angular
        .module('app.message')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['$q','$http'];
    function MessageService($q,$http) {
        var service = {};

        service.GetAllMessage = GetAllMessage;
        service.GetOneMessage = GetOneMessage;
        service.Update = Update;
        service.Delete = Delete;
        service.Add = Add;
        return service;

        // Public functions
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
        function GetOneMessage(id){
            var deffered = $q.defer();

            /* Fake results */
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