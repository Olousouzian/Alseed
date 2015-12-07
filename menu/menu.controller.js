(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['UserService', '$rootScope'];
    function MenuController(UserService, $rootScope) {
        var vm = this;

        initController();

        function initController() {
            
        }
    }

})();