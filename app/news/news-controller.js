(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name NewsController
     * @param UserService
     * @param NewsService
     * @param ModalService
     * @param FlashService
     * @description
     * Controller permit to display all news
     */
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
        /**
         * Call loadCurrentUser
         * @memberof NewsController
         */
        function initController() {
            loadCurrentUser();
        }
        /**
         * Get current user logged
         * @memberof NewsController
         */
        function loadCurrentUser() {
            UserService.GetCurrentUser().then(function (response) {
                vm.user = response.data;
            });
        }

        // Public functions
        /**
         * Permit to delete a news
         * @memberof NewsController
         * @param {string} index index of news
         * @param {object} context contain all info about news
         */
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
        /**
         * Call When scroll to load more news
         * @memberof NewsController
         */
        vm.loadMore = function(){
           NewsService.GetAll().then(function (response) {
               vm.news = vm.news.concat(response.data);
           });
        };
    }
})();