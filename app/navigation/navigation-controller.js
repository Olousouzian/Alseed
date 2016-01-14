(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$scope', 'FlashService', 'RequestService', 'NavigationService'];
    function NavigationController($scope, FlashService, RequestService, NavigationService) {
        var vm = this;

        vm.items = {};
        vm.itemsAsJson = {};
        vm.isLoaded = false;

        initController();

        // Private functions
        function initController() {
            NavigationService.GetNav().then(function(response) {
                if (response.success === true) {
                    vm.isLoaded = true;
                    vm.items = response.data;

                    angular.forEach(vm.items, function(item, id) {
                        vm.items[id].editing = false;
                        vm.items[id].temp = '';
                    });

                    // Model to JSON
                    $scope.$watch('vm.items', function(items) {
                        formatItems(items);
                    }, true);
                } else {
                    FlashService.Error("Impossible de charger l'arborescence !");
                }
            });
        }

        function formatItems(items) {
            var formated = [];

            // Remove temporary labels & isCollapsed key
            var order = 0;
            angular.forEach(items, function(item, id) {
                formated.push({
                    id: item.id,
                    label: item.label,
                    order: order
                });
                order++;
            });

            vm.itemsAsJson = angular.toJson(formated, true);
        }

        // Public functions
        vm.edit = function(item) {
            item.editing = !item.editing;
        }

        vm.updateItem = function(item) {
            if (item.temp === '') {
                item.error = 'Le label de la rubrique ne peux pas être vide !'; 
                return;
            }

            // Set new label
            item.label = item.temp;
            
            // Reset item properties
            item.temp = '';
            item.error = '';
            item.editing = false;
        }

        vm.saveItems = function() {
            NavigationService.PostNav(vm.itemsAsJson).then(function(response) {
                if (response.success === true) {
                    FlashService.Success("Les modifications ont bien été enregistrées !");
                } else {
                    FlashService.Error("Impossible d'enregistrer les modifications !");
                }
            });
        }
    }
})();