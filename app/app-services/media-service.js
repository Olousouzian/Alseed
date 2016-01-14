(function () {
    'use strict';
    angular.module('app.media', []);

    angular
        .module('app.media')
        .factory('MediaService', MediaService);
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

        // Public functions
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

        function GetFile(id) {
            var deffered = $q.defer();
            var success = Object.clone(SuccessResponse);
            deffered.resolve(success);
            return deffered.promise;
        }

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