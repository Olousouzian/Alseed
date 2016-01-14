(function () {
    'use strict';

    angular
        .module('app')
        .controller('TreeController', TreeController);

    TreeController.$inject = ['$scope', 'FlashService', 'TreeService'];
    function TreeController($scope, FlashService, TreeService) {
        var vm = this;

        vm.trees = {};
        vm.treesAsJson = {};
        vm.isLoaded = false;

        initController();

        // Private functions
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

        vm.edit = function(item) {
            item.editing = !item.editing;
        };

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

        vm.remove = function(context) {
            context.remove();
        };

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