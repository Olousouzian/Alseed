(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name ForgetController
     * @param $location
     * @param $timeout
     * @param FlashService
     * @description
     * Controller Call when we go on forget password page
     */
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
