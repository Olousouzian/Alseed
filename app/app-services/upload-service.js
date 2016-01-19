(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.upload
     */
    angular.module('app.upload', [
        'ngFileUpload',
    ]);
    angular
        .module('app.upload')
        .factory('UploadService', UploadService);
    /**
     * @memberof app.upload
     * @ngdoc service
     * @name Uploadservice
     * @param $q Manages promise
     * @param
     * @param $http Permit to call API
     */
    UploadService.$inject = ['$q', '$http'];
    function UploadService($q, $http) {
        var service = {};

        service.UploadFile = UploadFile;
        service.UploadFiles = UploadFiles;

        return service;

        /**
         * Function calling API and upload file on server. If param oldFile exist UploadFile is calling by edit function so we return the wew file updated
         * @memberof UploadService
         * @param {file} file
         * @param {file} oldFile
         */
        function UploadFile(file, oldFile){
            var deffered = $q.defer();
            var route = 'upload/fileUpload';
            var params = {file : file,
            oldfile : oldFile};
            $http.post(route, params).then(function(data){
                var success = Object.clone(SuccessResponse);
                if(angular.isUndefined(oldFile) === false){
                    success.data = data.data.files[0];
                }
                else {
                    success.data = "Fichier uploadé";
                }
                deffered.resolve(success);
            }, function(status) {
                deffered.reject(status);
            });
            return deffered.promise;
        }
        /**
         * Permit to upload  multiple files
         * @memberof UploadService
         * @param {array} files Contains multiple files in array
         */
        function UploadFiles(files){
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    UploadFile(files[i]);
                }
            }
        }
    }

})();