(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$q', '$http', '$rootScope'];
    function UserService($q, $http, $rootScope) {
        var service = {};

        service.Login = Login;
        service.GetCurrentUser = GetCurrentUser;

        // Local Storage
        var currentUser = undefined;

        return service;

        // Public functions
        function Login(username, password){

            var deffered = $q.defer();


            // WS Parameters
            var route = '/api/user/login';
            var params = { username : username, password : password };

            // Fake Results
            if (username == 'loginTest' && password == 'test'){
                var userFakeObj = { idUser : 123 };
                var success = Object.clone(SuccessResponse);
                success.data = userFakeObj;
                deffered.resolve(success);
            } else {
                var error = Object.clone(ErrorResponse);
                error.message = 'Identifiant ou mot de passe incorrect';
                deffered.resolve(error);
            }

            /* Real WebServices
            $http.post(route, params).then(
                function(data){
                deffered.resolve(data);
            },  function(status) {
                deffered.reject(status);
            });
            */

            return deffered.promise;
        }

        function GetCurrentUser(){

            var deffered = $q.defer();

            // WS Parameters
            var route = '/api/user/myself';
            var params = { idUser : $rootScope.globals.currentUser.idUser };

            // Fake Results
            if (params.idUser == 123){

                if (typeof currentUser == "undefined"){
           
                    var userFakeObj = { firstname : 'firstName', lastname : 'lastName' };
                    var success = Object.clone(SuccessResponse);
                    success.data = userFakeObj;
                    currentUser = success;
                    deffered.resolve(success);
                } else {
                    deffered.resolve(currentUser);
                }
            } else {
                var error = Object.clone(ErrorResponse);
                deffered.resolve(error);
            }

            /* Real WebServices
            $http.post(route, params).then(
                function(data){
                deffered.resolve(data);
            },  function(status) {
                deffered.reject(status);
            });
            */

            return deffered.promise;
        }       
    }

})();
