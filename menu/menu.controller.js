(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', 'UserService', '$rootScope', 'SearchService'];
    function MenuController($scope, UserService, $rootScope, SearchService) {
        /*var vm = this;

        vm.search_expression = null;
        vm.results = [];*/

        initController();

        function initController() {
            $scope.search_expression = null;
            $scope.results = null;
            $scope.displaySearchResults = false;   
        }

        $scope.setSearchResults = function(value) {
            $scope.displaySearchResults = value;
        }

        $scope.search = function() {
            SearchService.Search($scope.search_expression, {}).then(function(response) {
                if (response.success) {
                    $scope.results = response.data;
                }
            });
        }
    }

})();