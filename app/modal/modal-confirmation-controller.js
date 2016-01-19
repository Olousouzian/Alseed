(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name ModalConfirmationController
     * @param $scope
     * @param $element
     * @param close
     * @description
     * Controller permit to confirm an action
     */
    angular
        .module('app')
        .controller('ModalConfirmationController', ModalConfirmationController);

    ModalConfirmationController.$inject = ['$scope', '$element', 'close'];
    function ModalConfirmationController($scope, $element, close) {
        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    }
})();