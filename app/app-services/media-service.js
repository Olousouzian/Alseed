(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc module
     * @name app.media
     */
    angular.module('app.media', []);
    angular
        .module('app.media')
        .factory('MediaService', MediaService);
    /**
     * @memberof app.media
     * @ngdoc service
     * @name MediaService
     * @param UploadService Permit to upload a file on server
     * @param $q Permit to instanciate a promise
     * @param $http Permit to call API.
     * @description This service manages all media
     */
    MediaService.$inject = ['UploadService', '$q', '$http'];
    function MediaService(UploadService, $q, $http) {
        var service = {};
        
        service.GetAllFiles = GetAllFiles;
        service.GetFile = GetFile;
        service.UploadFile = UploadFile;
        service.UpdateFile = UpdateFile;
        service.DeleteFile = DeleteFile;
        service.Search = Search;

        return service;
        /**
         * Get number of file define by filelength from place define by offset
         * @memberof Mediaservice
         * @param {int} fileLength file number to get
         * @param {int} offset Place where get file
         */
        function GetAllFiles(fileLength,offset){
            var deffered = $q.defer();

           // var route = 'file'+offset+".json";
            var route = '/media/allMedia';
            var params = {offset : offset,
                          fileLength : fileLength
                            };

             $http.get(route, params).then(function(data) {
                var arrayFile = [];
                angular.forEach(data.data.files, function(file) {
                    arrayFile.push(file);
                });
                var success = Object.clone(SuccessResponse);
                success.data = arrayFile;
                // TODO: move next line to controller

                deffered.resolve(success);
            }, function() {
                var error = Object.clone(ErrorResponse);
                deffered.reject(error);
            });
            return deffered.promise;
        }
        /**
         * Permit to search file due to expression
         * @memberof MediaService
         * @param {string} expression
         */
        function Search (expression){
            var route = '/media/searchMedia';
            var params = {offset : "10",
                fileLength : "10"
            };

            var deffered = $q.defer();
            $http.get(route, params).then(function(data) {
                var success = Object.clone(SuccessResponse);
                success.data = data.data;
                deffered.resolve(success);
            });
            return deffered.promise;
        }
        /**
         * Permit to get one file depend to id
         * @memberof AuthentificationService
         * @param {string} id if file to get
         */
        function GetFile(id) {
            var deffered = $q.defer();
            var success = Object.clone(SuccessResponse);
            deffered.resolve(success);
            return deffered.promise;
        }
        /**
         * Permit to delete file on API
         * @memberof MediaService
         * @param {File} file

         */
        function DeleteFile(file) {
            var deffered = $q.defer();
            var route = '/media/deleteMedia';
            var params = {file: file.id};
            $http.delete(route, params).then(function(data) {
            var success = Object.clone(SuccessResponse);
            deffered.resolve(success);
            }, function() {
                var error = Object.clone(ErrorResponse);
                deffered.reject(error);
            });

            return deffered.promise;
        }
        /**
         * Permit to add  file
         * @memberof MediaService
         * @param {array} localfile
         */
        function UploadFile(localFile) {
            var deffered = $q.defer();
            UploadService.UploadFile(localFile).then(function(data) {
                var factory = new FileFactory ();

                var file = factory.Create(data);

                var success = Object.clone(SuccessResponse);
                success.data = file;
                deffered.resolve(success);
            }, function() {
                var error = Object.clone(ErrorResponse);
                deffered.reject(error);
            });
            return deffered.promise;
        }
        /**
         * Permit to update existing file
         * @memberof MediaService
         * @param {string} newfile
         * @param {string} oldfile
         */
        function UpdateFile(newFile,oldFile) {
            var deffered = $q.defer();
            UploadService.UploadFile(newFile, oldFile).then(function(data){
                var success = Object.clone(SuccessResponse);
                success.data = data.data;
                deffered.resolve(success);
            }, function() {
                var error = Object.clone(ErrorResponse);
                deffered.reject(error);
            });
            return deffered.promise;
        }
    }
})();