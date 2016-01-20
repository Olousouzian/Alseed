(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name NavigationController
     * @param $scope
     * @param FlashService
     * @param RequestService
     * @param NavigationService
     * @description
     * Controller permit display and edit navigation page
     */
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
        /**
         * Permit to get navigation and display it
         * @memberof NavigationController
         */
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
        /**
         * Permit to format items as json
         * @memberof NavigationController
         * {object} items Contain all items of navigation
         */
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
        /**
         * Permit to edit wording of item selected
         * @memberof NavigationController
         * {object} item item to edit
         */
        vm.edit = function(item) {
            item.editing = !item.editing;
        }
        /**
         * Permit to update item
         * @memberof NavigationController
         * {object} item item to update
         */
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
        /**
         * Permit to save items
         * @memberof NavigationController
         */
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