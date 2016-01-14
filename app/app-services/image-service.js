(function () {
    'use strict';
    angular.module('app.image', []);
    angular
        .module('app.image')
        .factory('ImageService', ImageService);

    ImageService.$inject = [];
    function ImageService() {
        var service = {};

        service.GetImage = GetImage;

        return service;

        // Public functions
        function GetImage() {
            return true;
        }
    }
})();
