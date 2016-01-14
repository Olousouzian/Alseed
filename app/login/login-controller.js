(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'CacheService', 'FlashService'];
    function LoginController($location, AuthenticationService, CacheService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // Reset login status
            AuthenticationService.ClearCredentials();
            CacheService.ClearAllCache();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {

                if (response.success) {
                    // Save this parameters for this instance
                    AuthenticationService.SetCredentials(vm.username, vm.password, response.data.idUser);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
