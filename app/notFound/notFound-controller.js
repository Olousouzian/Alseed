(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name NotFoundController
     * @param ModalService Permit to display and manage modal (simple complex detail modal and  media modal)
     * @param FlashService Permit to display message on scope
     * @param ThemeService Permit to apply different theme following the case of using
     * @param Uploadservice Permit to upload file on server
     * @param rootscope Permit to access the global variable of the app
     * @description
     * Controller permit to redirect id page ask doesn't exist
     */
    angular
        .module('app')
        .controller('NotFoundController', NotFoundController);

    NotFoundController.$inject = ['UserService', '$rootScope', '$location', '$timeout'];
    function NotFoundController(UserService, $rootScope, $location, $timeout) {
        var vm = this;

        initController();
        /**
         * Permit to redirect on main page
         * @memberof NotFoundController
         */
        function initController() {
            vm.dataLoading = true;
            $timeout(function () {
                $location.path('/');
            }, 1000);
        }
    }

})();