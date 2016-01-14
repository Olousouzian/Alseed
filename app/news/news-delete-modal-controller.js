(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewsDeleteModalController', NewsDeleteModalController);

    NewsDeleteModalController.$inject = ['$scope', '$element', 'close'];
    function NewsDeleteModalController($scope, $element, close) {
        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    }
})();