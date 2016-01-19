(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name HomeController
     * @param $location
     * @param $timeout
     * @param FlashService
     * @description
     * Controller of home page
     */
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService'];
    function HomeController(UserService) {
        var vm = this;

        vm.user = null;

        initController();
        /**
         * Call loadCurrentUser
         * @memberof HomeController
         */
        function initController() {
            loadCurrentUser();
        }
        /**
         * Get current user load
         * @memberof HomeController
         */
        function loadCurrentUser() {
            UserService.GetCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                });
        }
    }

})();