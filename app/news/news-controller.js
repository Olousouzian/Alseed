(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['UserService', 'NewsService', 'ModalService', 'FlashService'];
    function NewsController(UserService, NewsService, ModalService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.news = [];

        initController();

        // Private functions
        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetCurrentUser().then(function (response) {
                vm.user = response.data;
            });
        }

        // Public functions
        vm.delete = function(context, index) {
            ModalService.showModal({
                templateUrl: "news/modal-news-delete-view.html",
                controller: "NewsDeleteModalController"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        NewsService.Delete(context.item.id).then(function(response) {
                            if (response.success === true) {
                                vm.news.splice(index, 1);
                                FlashService.Success('L\'actualité a bien été supprimée !');
                            } else {
                                FlashService.Error('Impossible de supprimer cette actualité !');                
                            }
                        });
                    }
                });
            }).catch(function() {
                FlashService.Error('Une erreur est survenue');
            });
        }

        vm.loadMore = function(){
           NewsService.GetAll().then(function (response) {
               vm.news = vm.news.concat(response.data);
           });
        };
    }
})();