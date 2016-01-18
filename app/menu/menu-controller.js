(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', 'UserService', '$rootScope', 'SearchService', 'TranslateService'];
    function MenuController($scope, UserService, $rootScope, SearchService, TranslateService) {
        initController();

        function initController() {
            $scope.search_expression = null;
            $scope.results = [];
            $scope.displaySearchResults = false;
            $scope.languages = [];

            TranslateService.GetLanguages().then(function(response) {
                if (response.success) {
                    $scope.languages = response.data;
                }
            });
        }

        $scope.setSearchResults = function(value) {
            if (value === false) {
                $scope.results = [];
            }
            $scope.displaySearchResults = value;
        }

        $scope.search = function() {
            $scope.resetSearch();

            SearchService.Search($scope.search_expression, {'services': ['UserService', 'NewsService'], 'length': '2', 'offset': '0'}).then(function(response) {
                if (response.success === true && response.data.length > 0) {
                    angular.forEach(response.data, function(res, id) {
                        if (res.success === true) {
                            $scope.results.push(res.data);
                        }
                    });
                }
            });
        }

        $scope.resetSearch = function() {
            $scope.results = [];
        }
    }
})();