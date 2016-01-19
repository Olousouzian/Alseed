(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.news
     */
    angular.module('app.news', []);
    angular
        .module('app.news')
        .factory('NewsService', NewsService);
    /**
     * @memberof app.news
     * @ngdoc service
     * @name NewsService
     * @param $q Manages promise
     * @param RequestService Other way to call API with detail model structure as response
     * @param $http Permit to call API
     * @descriptions Service manages news.
     */
    NewsService.$inject = ['$q', 'RequestService', '$http'];
    function NewsService($q, RequestService, $http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetOne = GetOne;
        service.Add = Add;
        service.Update = Update;
        service.Delete = Delete;
        service.Search = Search;

        return service;

        /**
         * Function to get all news
         * @memberof NewsService
         */
        function GetAll(){
            var deffered = $q.defer();
            var route = '/news/allNews';
            var params = {offset : "10",
                fileLength : "10"
            };
            var deffered = $q.defer();
            $http.get(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                success.data = data.data;
                deffered.resolve(success);
            });



            return deffered.promise;
        }
        /**
         * Function to get one news specify by id
         * @memberof NewsService
         * @param {int} id id from news
         */
        function GetOne(id) {
            var deffered = $q.defer();

            /* Fake results */
            GetAll().then(function(response) {
                if (response.success === true) {
                    for (var i=0; i < response.data.length; i++) {
                        if (Number(response.data[i].id) === Number(id)) {
                            var success = Object.clone(SuccessResponse);
                            success.data = response.data[i];
                            deffered.resolve(success);
                            break;
                        }
                    }
                } else {
                    var error = Object.clone(ErrorResponse);
                    deffered.reject(error);
                }
            });

            /* Real WS */
            /*var route = '/api/news/' + id;
            RequestService.Get(route, {}).then(function(response) {
                deffered.resolve(response);
            });*/

            return deffered.promise;
        }
        /**
         * Function to add news with all info like (active...) on server
         * @memberof AuthentificationService
         * @param {object} news Object contains all info about news
         */
        function Add(news) {
            var deffered = $q.defer();
            var route = '/news/addNews';
            var params = {news : news};
            $http.post(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                success.data = data.data[0];
                deffered.resolve(success);
            });
            return deffered.promise;
        }
        /**
         * Function to update a news  on server
         * @memberof NewsService
         * @param {object} news Object contains all info about news
         */
        function Update(news) {
            var deffered = $q.defer();

            var route = '/news/updateNews';
            var params = {news : news};
            $http.post(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                deffered.resolve(success);
            });

            return deffered.promise;
        }
        /**
         * Function to delete a news on server
         * @memberof AuthentificationService
         * @param {int} id id from news
         */
        function Delete(id) {
            var deffered = $q.defer();

            if (angular.isUndefined(id) === true) {
                var error = Object.clone(ErrorResponse);
                error.message = 'NewsService.Delete : Missing id';
                deffered.reject(error);
            } else {
                var route = '/news/deleteNews';
                var params = {id : id};
                $http.post(route, params).then(function(data) {
                    var success = Object.clone(SuccessResponse);
                    deffered.resolve(success);
                });
            }

            return deffered.promise;
        }
        /**
         * Function to display news about expression search. It display number of news depend of options.fileLength and options.offset
         * @memberof NewsService
         * @param {string} expression value from input search
         * @param {object} options Number file to get and which object begin to get
         */
        function Search(expression, options) {
            var deffered = $q.defer();

            /* Fake results */
            GetAll().then(function(response) {
                if (response.success === true) {
                    var results = [];
                    angular.forEach(response.data, function(result, id) {
                        results.push({
                            label: result.title,
                            url: '#/news/' + result.id
                        });
                    });

                    var search = Object.clone(SearchResponse);
                    search.service = 'Actu Marque';
                    search.results = results;

                    var success = Object.clone(SuccessResponse);
                    success.data = search; 
                    
                    deffered.resolve(success);
                } else {
                    var error = Object.clone(ErrorResponse);
                    deffered.reject(error);
                }
            });

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