(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotFoundController', NotFoundController);

    NotFoundController.$inject = ['UserService', '$rootScope'];
    function NotFoundController(UserService, $rootScope) {
        var vm = this;

        initController();

        function initController() {
        }
    }

})();