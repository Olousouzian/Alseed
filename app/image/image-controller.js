(function () {
    'use strict';

    angular
        .module('app')
        .controller('ImageController', ImageController);

    ImageController.$inject = ['ImageService', '$rootScope'];
    function ImageController(ImageService, $rootScope) {
        var vm = this;

        vm.images = [];

        initController();

        function initController() {
            // Reset login status
            getImage();
        }

        function getImage() {
            ImageService.GetImage($rootScope.globals[0].idUser);
        }
    }

})();
