(function () {
    'use strict';

    angular
        .module('app')
        .controller('TermsController', TermsController);

    TermsController.$inject = ['TermsService', '$location', '$routeParams', '$document', 'NewsService', 'ModalService', 'FlashService'];
    function TermsController(TermsService, $location, $routeParams, $document, NewsService, ModalService, FlashService) {
        var vm = this;

        vm.terms = "";
        vm.Save = function(){
            TermsService.Save(vm.terms).then(function (response){
               if (response.success === true) {
                   FlashService.Success('Les cgu ont bien été mise à jour !');
               } else {
                   FlashService.Error('Impossible de mettre à jour les CGU !');
               }
               $document.scrollTop(0);
            });
        }
        vm.Reset = function(){
            vm.terms = "";
        }
        // Private functions

    }
})();