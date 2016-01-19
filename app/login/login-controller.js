(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name loginController
     * @param $location
     * @param AuthentificationService
     * @param CacheService
     * @param FlashService
     * @description
     * Controller of login page
     */
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'CacheService', 'FlashService'];
    function LoginController($location, AuthenticationService, CacheService, FlashService) {
        var vm = this;

        vm.login = login;
        /**
         * Clear all cache and cookie
         * @memberof LoginController
         */
        (function initController() {
            // Reset login status
            AuthenticationService.ClearCredentials();
            CacheService.ClearAllCache();
        })();
        /**
         * Call authentificationService.login to test to log user
         * @memberof LoginController
         */
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
