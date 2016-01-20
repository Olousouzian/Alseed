(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name TreesController
     * @param $rootScope
     * @param $scope
     * @param FlashService
     * @param TreeService
     * @description
     * Controller permit to display and manage tree of app
     */
    angular
        .module('app')
        .controller('TreesController', TreesController);

    TreesController.$inject = ['$rootScope', '$scope', 'FlashService', 'TreeService'];
    function TreesController($rootScope, $scope, FlashService, TreeService) {
        var vm = this;
        vm.trees = {};
        vm.treesAsJson = {};
        vm.isLoaded = false;
        initController();

        // Private functions
        /**
         * Permit to get tree and display it
         * @memberof TreesController
         */
        function initController() {
            TreeService.GetTree().then(function(response) {
                if (response.success === true) {
                    vm.isLoaded = true;
                    vm.trees = initItems(response.data);

                    // Model to JSON
                    $scope.$watch('vm.trees', function(trees) {
                        formatItems(trees);
                    }, true);
                } else {
                    FlashService.Error("Impossible de charger l'arborescence !");
                }
            });
        }
        /**
         * Permit to get init an item
         * @memberof TreesController
         * @param {object} items Contains all item of tree
         */
        function initItems(items) {
            var init = [];

            angular.forEach(items, function(item, id) {
                init[id] = item;
                init[id].collapsed = false;
                init[id].editing = false;
                init[id].temp = '';
                init[id].childs = angular.isUndefined(item.childs) === false ? initItems(item.childs) : [];
            });

            return init;
        }
        /**
         * Permit to convert all item json format
         * @memberof TreesController
         * @param {object} items Contains all item of tree
         */
        function formatItems(items) {
            var formated = [];

            // Remove temp & collapsed & editing & error keys
            var order = 0;
            angular.forEach(items, function(item, id) {
                formated.push({
                    id: item.id,
                    label: item.label,
                    order: order,
                    childs: angular.isUndefined(item.childs) === false && item.childs.length > 0 ? formatItems(item.childs) : []
                });
                order++;
            });

            vm.treesAsJson = angular.toJson(formated, true);
        }

        // Public functions
        vm.toggle = function(context) {
            context.toggle();
        };
        /**
         * Permit to add item
         * @memberof TreesController
         * @param {object} context
         */
        vm.add = function(context) {
            var nodeData = context.$modelValue;
            nodeData.childs.push({
                id: nodeData.id * 10 + nodeData.childs.length,
                label: nodeData.label + '.' + (nodeData.childs.length + 1),
                childs: [],
                temp: '',
                error: '',
                collapsed: false,
                editing: true
            });
        };
        /**
         * Permit to edit item of tree
         * @memberof TreesController
         */
        vm.edit = function(item) {
            item.editing = !item.editing;
        };
        /**
         * Permit to update item
         * @memberof TreesController
         * @param {object} item item of tree to update
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
        };
        /**
         * Permit to remove item
         * @memberof TreesController
         * @param {object} context
         */
        vm.remove = function(context) {
            context.remove();
        };
        /**
         * Permit to save all item and display FlashService
         * @memberof TreesController
         * @param {object} context
         */
        vm.saveItems = function() {
            TreeService.PostTree(vm.treesAsJson).then(function(response) {
                if (response.success === true) {
                    FlashService.Success("Les modifications ont bien été enregistrées !");
                } else {
                    FlashService.Error("Impossible d'enregistrer les modifications !");
                }
            });
        };
    }
})();