(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotFoundController', NotFoundController);

    NotFoundController.$inject = ['UserService', '$rootScope', '$location', '$timeout'];
    function NotFoundController(UserService, $rootScope, $location, $timeout) {
        var vm = this;

        initController();

        function initController() {
            vm.dataLoading = true;
            $timeout(function () {
                $location.path('/');
            }, 1000);
        }
    }

})();