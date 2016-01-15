(function () {
    'use strict';

    angular
        .module('app')
        .controller('ForgetController', ForgetController);

    ForgetController.$inject = ['$location', '$timeout', 'FlashService'];
    function ForgetController($location, $timeout, FlashService) {
        var vm = this;
        vm.forget = forget;

        function forget() {
            vm.dataLoading = true;
            
            $timeout(function() {
                FlashService.Success('An email has been sent. Check your inbox.', true);
                $location.path('/login');
            }, 1500);
        }
    }

})();
