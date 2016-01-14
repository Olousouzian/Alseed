(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService'];
    function HomeController(UserService) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });
        }
    }

})();