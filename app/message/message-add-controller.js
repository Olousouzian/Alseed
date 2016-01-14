(function () {
    'use strict';

    angular
        .module('app')
        .controller('MessageAddController', MessageAddController);

    MessageAddController.$inject = ['PushService', '$scope', '$location', '$document', 'MessageService', 'ModalService', 'FlashService'];
    function MessageAddController(PushService, $scope, $location, $document, MessageService, ModalService, FlashService) {
        var vm = this;
        vm.message ={
            active :true
        };

        initController();

        // Private functions
        function initController() {

        }

        function redirect() {
            $location.path('/message');
        }

        // Public functions

        vm.add = function() {
            // TODO : Validate form
            MessageService.Add(vm.message).then(function(response) {
                if (response.success === true) {
                    FlashService.Success('L\'actualité a bien été ajoutée !', true);
                    if(vm.message.active === true) {
                        PushService.SendNotification(vm.message);
                    }
                    $location.path('/message/' + response.data.id);
                } else {
                    FlashService.Error('Impossible d\'ajouter cette actualité !');
                    $document.scrollTop(0);
                }
            });
        };
    }
})();