(function () {
    'use strict';
    angular.module('app.upload', [
        'ngFileUpload',
    ]);
    angular
        .module('app.upload')
        .factory('UploadService', UploadService);

    UploadService.$inject = ['$q', 'Upload', '$http'];
    function UploadService($q, Upload, $http) {
        var service = {};

        service.UploadFile = UploadFile;
        service.UploadFiles = UploadFiles;

        return service;

        // Public functions
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

        function UploadFiles(files){
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    UploadFile(files[i]);
                }
            }
        }
    }

})();