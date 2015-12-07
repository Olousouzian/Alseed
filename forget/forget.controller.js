(function () {
    'use strict';

    angular
        .module('app')
        .controller('ForgetController', ForgetController);

    ForgetController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function ForgetController(UserService, $location, $rootScope, FlashService) {
        var vm = this;
        vm.forget = forget;

        function forget() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Un e-mail vous a été envoyé.', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
