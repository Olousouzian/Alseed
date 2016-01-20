(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.flash
     */
    angular.module('app.flash', []);
    angular
        .module('app.flash')
        .factory('FlashService', FlashService);
    /**
     * @memberof app.flash
     * @ngdoc service
     * @name Flashservice
     * @param $rootscope To display message  on rootscope
     * @description This service permit to display message.
     */
    FlashService.$inject = ['$rootScope'];
    function FlashService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;
        /**
         * Function To clear message on view
         * @memberof FlashService
         */
        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // Only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }
        /**
         * Function To display a succes message on view
         * @memberof FlashService
         */
        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
        /**
         * Function To display an error message  on view
         * @memberof FlashService
         */
        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();