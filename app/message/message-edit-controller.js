(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name MessageEditController
     * @param PushService
     * @param $location
     * @param $routeParams
     * @param $document
     * @param MessageService
     * @param ModalService
     * @param FlashService
     * @description
     * Controller permit to edit message on timeline
     */
    angular
        .module('app')
        .controller('MessageEditController', MessageEditController);

    MessageEditController.$inject = ['PushService', '$location', '$routeParams', '$document', 'MessageService', 'ModalService', 'FlashService'];
    function MessageEditController(PushService, $location, $routeParams, $document, MessageService, ModalService, FlashService) {
        var vm = this;

        vm.isLoaded = false;
        vm.message = {};
        vm.msg = {active : true};

        initController();

        // Private functions
        /**
         * Get one message in terms of $routeParam.id and display info
         * @memberof MessageEditController
         */
        function initController() {
            MessageService.GetOneMessage($routeParams.id).then(function(response) {
                if (response.success === true) {
                    vm.message = response.data;
                    vm.isLoaded = true;
                } else {
                    FlashService.Error('Cette actualité est introuvable !', true);
                    redirect();
                }
            });
        }
        /**
         * Redirect on message page
         * @memberof MessageEditController
         */
        function redirect() {
            $location.path('/message');
        }

        // Public functions
        /**
         * Permit to update a  message
         * @memberof MessageEditController
         */
        vm.update = function() {
            MessageService.Update(vm.message).then(function(response) {
                if (response.success === true) {
                    FlashService.Success('L\'actualité a bien été ajoutée !', true);
                    if(vm.msg.active === true) {
                        PushService.SendNotification(vm.message);
                    }
                    $location.path('/message/' + vm.message.id);
                } else {
                    FlashService.Error('Impossible de mettre à jour cette actualité !');
                }
                $document.scrollTop(0);
            });
        };
        /**
         * Permit to delete a message
         * @memberof MessageEditController
         */
        vm.delete = function() {
            MessageService.Delete(vm.message.id).then(function(response) {
                if (response.success === true) {
                    FlashService.Success('L\'actualité a bien été supprimée !', true);
                    redirect();
                } else {
                    FlashService.Error('Impossible de supprimer cette actualité !');
                }
            });
        };
    }
})();