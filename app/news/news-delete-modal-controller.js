(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name NewsDeleteModalController
     * @param $scope
     * @param $element
     * @param close
     * @description
     * Modal confirmation when we delete a news
     */
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