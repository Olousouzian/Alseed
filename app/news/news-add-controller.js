(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewsAddController', NewsAddController);

    NewsAddController.$inject = ['$rootScope', '$scope', '$timeout', '$location', '$document', 'NewsService', 'ModalService', 'FlashService'];
    function NewsAddController($rootScope, $scope, $timeout, $location, $document, NewsService, ModalService, FlashService) {
        var vm = this;

        initController();

        // Private functions
        function initController() {
            vm.format = 'dd/MM/yyyy';

            vm.initializing = true;
            vm.today = new Date();

            vm.popup_publish_start = {
                opened: false
            };

            vm.popup_publish_end = {
                opened: false
            };

            vm.news = {
                title: '',
                excerpt: '',
                content: '',
                active: true,
                created_at: null,
                updated_at: null,
                publish_start: vm.today,
                publish_end: vm.today
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.modelOptions = {
                timezone: 'UTC'
            };

            vm.updated = false;
            $scope.$watch(angular.bind(vm, function (vm) {
                return vm.news;
            }), function (newVal, oldVal) {
                if (vm.initializing) {
                    $timeout(function() { 
                        vm.initializing = false;
                    });
                } else {
                    $rootScope.preventNavigation();
                }
            });
        }

        function redirect() {
            $location.path('/news');
        }

        // Public functions
        vm.open_popup_publish_start = function() {
            vm.popup_publish_start.opened = true;
        };

        vm.open_popup_publish_end = function() {
            vm.popup_publish_end.opened = true;
        };

        vm.add = function() {
            // TODO : Validate form
            NewsService.Add(vm.news).then(function(response) {
                if (response.success === true) {
                    FlashService.Success('L\'actualité a bien été ajoutée !', true);
                    $location.path('/news/' + response.data.id);
                } else {
                    FlashService.Error('Impossible d\'ajouter cette actualité !');
                    $document.scrollTop(0);
                }
            });
        };
    } 
})();