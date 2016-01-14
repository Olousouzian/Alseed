(function () {
    'use strict';

    angular
        .module('app')
        .config(function($provide) {
            $provide.decorator('taOptions', ['ModalService', 'taRegisterTool', '$delegate', function(ModalService, taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
                taRegisterTool('download', {
                    buttontext: 'download',
                    action: function(deferred,restoreSelection) {
                        var edit = this;
                        //edit.$editor().wrapSelection('insertImage', "upload/editer.png", true);
                        ModalService.showModal({
                            templateUrl: "modal/modal-media-view.html",
                            controller: "MediaModalController",
                            inputs: {
                                title: "Complex Example",
                                submitButton: "OK",
                                cancelButton: "Cancel"
                            }
                        }).then(function(modal) {
                            modal.element.modal();
                            modal.close.then(function(result) {
                                if(result[0] == "select"){
                                    restoreSelection();
                                    edit.$editor().wrapSelection('insertImage', result[1].url);
                                    deferred.resolve();
                                }
                            });
                        }).catch(function(error) {
                            FlashService.Error('Error : ' + error);
                        });
                        return false;
                    }
                });
                taOptions.toolbar[1].push('download');
                return taOptions;
            }]);
        })
        .controller('NewsEditController', NewsEditController);

    NewsEditController.$inject = ['$location', '$routeParams', '$document', 'NewsService', 'ModalService', 'FlashService'];
    function NewsEditController($location, $routeParams, $document, NewsService, ModalService, FlashService) {
        var vm = this;

        vm.isLoaded = false;
        vm.news = {};

        initController();

        // Private functions
        function initController() {
            NewsService.GetOne($routeParams.id).then(function(response) {
                if (response.success === true) {
                    vm.news = response.data;
                    vm.isLoaded = true;
                } else {
                    FlashService.Error('Cette actualité est introuvable !', true);
                    redirect();
                }
            });
        }

        function redirect() {
            $location.path('/news');
        }

        // Public functions
        vm.update = function() {
            NewsService.Update(vm.news).then(function(response) {
                if (response.success === true) {
                    FlashService.Success('L\'actualité a bien été mise à jour !');
                    redirect();
                } else {
                    FlashService.Error('Impossible de mettre à jour cette actualité !');
                }
                $document.scrollTop(0);
            });
        };

        vm.delete = function() {
            ModalService.showModal({
                templateUrl: "news/modal-news-delete-view.html",
                controller: "NewsDeleteModalController"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        NewsService.Delete(vm.news.id).then(function(response) {
                            if (response.success === true) {
                                FlashService.Success('L\'actualité a bien été supprimée !', true);
                                redirect();
                            } else {
                                FlashService.Error('Impossible de supprimer cette actualité !');                
                            }
                        });
                    }
                });
            }).catch(function(error) {
                FlashService.Error('Une erreur est survenue');
            });
        };
    } 
})();