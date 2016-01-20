(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name MessageController
     * @param MessageService
     * @param $rootScope
     * @description
     * Controller to display all message save
     */
    angular
        .module('app')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['MessageService', '$rootScope'];
    function MessageController(MessageService, $rootScope) {
        var vm = this;

        vm.messages = [];
        vm.searchMessage = "";
        vm.searchDate = "";
        vm.Delete = function () {
            alert("delete");
        }
        initController();
        /**
         * Permit to get all message and display its on scope
         * @memberof MessageController
         */
        function initController() {
            MessageService.GetAllMessage().then(function(response){
               if(response.success) {
                   vm.messages = response.data;
               }
            });
            // Reset login status
        }


    }

})();