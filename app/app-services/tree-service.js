(function () {
    'use strict';
    angular.module('app.trees', []);
    angular
        .module('app.trees')
        .factory('TreeService', TreeService);

    TreeService.$inject = ['$q', '$http'];
    function TreeService($q, $http) {
        var service = {};

        service.GetTree = GetTree;
        service.PostTree = PostTree;

        return service;

        // Public functions
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

        function PostTree(trees) {
            var deffered = $q.defer();

            RequestService.Post('', {}, trees).then(function(response) {
                deffered.resolve(response);
            });

            return deffered.promise;
        }
    }
})();