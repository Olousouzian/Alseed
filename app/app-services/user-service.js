(function () {
    'use strict';
    angular.module('app.user', []);
    angular
        .module('app.user')
        .factory('UserService', UserService);

    UserService.$inject = ['$q', '$http', '$rootScope', 'RequestService'];
    function UserService($q, $http, $rootScope, RequestService) {
        var service = {};

        service.Login = Login;
        service.GetCurrentUser = GetCurrentUser;
        service.Search = Search;
        service.ClearCache = ClearCache;

        // Local Storage
        var currentUser = undefined;

        return service;

        // Public functions
        function ClearCache(){
            currentUser = undefined;
        }
        
        function Login(username, password){

            var deffered = $q.defer();

            // WS Parameters
            var route = '/api/user/login';
            var params = { username : username, password : password };

            // Fake Results
            if (username === 'loginTest' && password === 'test'){
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
            RequestService.Post(route, {}, params).then(function(response){
                deffered.resolve(data);
            }, function(status) {
                deffered.reject(status);
            });*/

            return deffered.promise;
        }

        function GetCurrentUser(){

            var deffered = $q.defer();

            var params = { idUser : angular.isUndefined($rootScope.globals.currentUser) === false ? $rootScope.globals.currentUser.idUser : undefined };

            // Fake Results
            if (angular.isUndefined(params.idUser) === false && params.idUser === 123) {
                if (typeof currentUser === "undefined"){
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
            // WS Parameters
            var route = '/api/user/myself';
            $http.post(route, params).then(
                function(data){
                deffered.resolve(data);
            },  function(status) {
                deffered.reject(status);
            });
            */

            return deffered.promise;
        }  

        function Search(expression, options) {
            var deffered = $q.defer();

            var results = [{
                    url: '#/users/123',
                    label: 'Fabien Olousouzian'
                }, {
                    url: '#/users/456',
                    label: 'Laurent Pitteloud'
                }, {
                    url: '#/users/789',
                    label: 'Alexis Quesnel'
                }];

            if (options.length < results.length) {
                results.splice(options.offset, options.length);
            }

            /* Fake results */
            var search = Object.clone(SearchResponse);
            search.service = 'Utilisateurs';
            search.results = results;

            var success = Object.clone(SuccessResponse);
            success.data = search;
            
            deffered.resolve(success);

            /* Real WebServices
            // WS Parameters
            var route = '/api/users/search';
            var params = { expression: expression, length: options.length, offset: options.offset }

            $http.get(route, params).then(
                function(data){
                    deffered.resolve(data);
            }, function(status) {
                deffered.reject(status);
            });
            */

            return deffered.promise;
        }     
    }

})();
