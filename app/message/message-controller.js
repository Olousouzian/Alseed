(function () {
    'use strict';

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