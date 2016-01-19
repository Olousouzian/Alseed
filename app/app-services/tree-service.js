(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.trees
     */
    angular.module('app.trees', []);
    angular
        .module('app.trees')
        .factory('TreeService', TreeService);
    /**
     * @memberof app.trees
     * @ngdoc service
     * @name TreeService
     * @param $q Manages promise
     * @param $http Permit to call API
     */
    TreeService.$inject = ['$q', '$http'];
    function TreeService($q, $http) {
        var service = {};

        service.GetTree = GetTree;
        service.PostTree = PostTree;

        return service;
        /**
         * Function to get tree from app
         * @memberof TreeService
         */
        function GetTree() {
            var deffered = $q.defer();
            var route = '/trees/getTree';
            var params = {};
            $http.get(route, params).then(function(data) {
                var response = Object.clone(SuccessResponse);
                response.data = data.data;
                deffered.resolve(response);
            });

            /*
             RequestService.Get('', {}).then(function(response) {
             deffered.resolve(response);
             });*/

            return deffered.promise;
        }
        /**
         * Function to set new info about tree
         * @memberof AuthentificationService
         * @param trees
         */
        function PostTree(trees) {
            var deffered = $q.defer();

            RequestService.Post('', {}, trees).then(function(response) {
                deffered.resolve(response);
            });

            return deffered.promise;
        }
    }
})();