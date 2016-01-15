(function () {
    'use strict';
    angular
        .module('app')
        .controller('DemoController', DemoController);

    DemoController.$inject = ['ModalService', 'FlashService', 'ThemeService','UploadService', '$rootScope'];
    function DemoController(ModalService, FlashService, ThemeService, UploadService, $rootScope) {
        var vm = this;
        /**
         * Permit to show a simple modal
         */
        vm.showSimpleModal = function() {
            ModalService.showModal({
                templateUrl: "modal/modal-simple-view.html",
                controller: "DemoSimpleModalController"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        FlashService.Success('You choose "Yes"');
                    }
                    else {
                        FlashService.Error('You choose "No"');
                    }
                });
            }).catch(function(error) {
                FlashService.Error('Error : ' + error);
            });
        }
        /**
         *  permit to show a media modal
         */
        vm.showMediaModal = function(){
            ModalService.showModal({
                templateUrl: "modal/modal-media-view.html",
                controller: "MediaModalController",
                inputs: {
                    title: "Complex Example",
                    submitButton: "OK",
                    cancelButton: "Cancel"
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        FlashService.Success('image has been select');
                    }
                    else {
                        FlashService.Error('You close modal');
                    }
                });
            }).catch(function(error) {
                FlashService.Error('Error : ' + error);
            });
        }
        /**
         * Permit to show a complex modal
         */
        vm.showComplexModal = function() {
            ModalService.showModal({
                templateUrl: "modal/modal-complex-view.html",
                controller: "DemoComplexModalController",
                inputs: {
                    title: "Complex Example",
                    submitButton: "OK",
                    cancelButton: "Cancel"
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        FlashService.Success('You validate modal with info : name = ' + result.name + ', age = ' + result.age);
                    }
                    else {
                        FlashService.Error('You close modal');
                    }
                });
            }).catch(function(error) {
                FlashService.Error('Error : ' + error);
            });
        }
        /**
         * Permit to upload a file on server
         */
        vm.uploadFile=function(file){
            UploadService.UploadFile(file).then(function (response) {
                if (response.success === true) {
                    FlashService.Success(response.data);
                }
                else {
                    FlashService.Error(response.data);
                }
            });
        }
        /**
         * permit to apply a new css theme on backOffice
         */
        $('#buttonTheme').click(function() {
            ThemeService.ApplyTheme(1).then(function (response) {
                $rootScope.theme.path = response.data;
            });
        });
        $('#buttonTheme1').click(function() {
            ThemeService.ApplyTheme(2).then(function (response) {
                $rootScope.theme.path = response.data;
            });
        });
    }
})();

(function () {
    'use strict';
    /****************************************************************************/
    /*** MODAL SERVICE **********************************************************/
    /****************************************************************************/
    angular
        .module('app')
        .controller('DemoSimpleModalController', DemoSimpleModalController);

    DemoSimpleModalController.$inject = ['$scope', '$element', 'close'];
    function DemoSimpleModalController($scope, $element, close) {
        $scope.closeSimple = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    }

    angular
        .module('app')
        .controller('MediaModalController', MediaModalController);
    /**
     * Media modal controller
     */
    MediaModalController.$inject = ['SearchService', 'ModalService', 'MediaService', '$scope', '$element', 'title', 'submitButton', 'cancelButton', 'close'];
    function MediaModalController(SearchService, ModalService, MediaService, $scope, $element, title, submitButton, cancelButton, close) {
        $scope.title = title;
        $scope.submitButton = submitButton;
        $scope.cancelButton = cancelButton;
        $scope.Medias = [];
        $scope.fileLength = 20;
        $scope.offset= 0;
        $scope.MediaLibrary = undefined;
        $scope.mediaOld = [];
        $scope.numOpenModal = 0;
        $scope.workInProgress = false;
        $scope.searchMedia = "";


        InitController();
        function InitController(){
            $scope.mediaLibrary = new MediaLibrary();
        }

        /**
         * Select a file, close modal and return file and action type
         */
        $scope.select = function(file){
            var result = [
                "select",
                file
            ];
            $scope.closeComplex(result);
        }
        /**
         * Permit to do a research on APi to get some specific file
         */
        $scope.Search = function (){
            if($scope.searchMedia === ""){
                $scope.Medias = $scope.mediaOld;
            }
            else {
                SearchService.Search($scope.searchMedia, {'services': ["MediaService"]}).then(function (response) {
                    if (response.success) {
                        $scope.Medias = [];
                        $scope.mediaLibraryTemp = new MediaLibrary();
                        angular.forEach(response.data, function (resp, id) {
                            if (resp.success && resp.data.results.length > 0) {

                                var fileFactory = new FileFactory();

                                angular.forEach(resp.data.results, function (file, id) {
                                    if ($scope.mediaLibraryTemp.GetLastFileCollection().IsFull() === true) {
                                        $scope.Medias.splice($scope.Medias.length - 1, 1);
                                        $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                        $scope.mediaLibraryTemp.PushNewFileCollection();
                                    }

                                    $scope.mediaLibraryTemp.GetLastFileCollection().AddItem(fileFactory.Create(file), $scope.fileLength);
                                });

                                if ($scope.mediaLibraryTemp.GetLastFileCollection().IsFull() == false) {
                                    if ($scope.offset == 0) {
                                        $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                    }
                                    else {
                                        if ($scope.mediaLibraryTemp.GetLastFileCollection().items != $scope.Medias[$scope.Medias.length - 1]) {
                                            $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                        }
                                    }

                                    if (Object.keys($scope.Medias[$scope.Medias.length - 1]).length != $scope.fileLength) {
                                        $scope.Medias.splice($scope.Medias.length - 1, 1);
                                        $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                    }
                                }
                                $scope.offset = $scope.offset + Object.keys($scope.Medias[$scope.Medias.length - 1]).length;

                            }
                        });
                    }
                });
            }
        }
        /**
         *Permit to get file if searchMedia is empty or specific file if searchMedia is not empty
         */
        $scope.LoadMore = function (){
            if ($scope.workInProgress === true) {
                return;
            }

            $scope.workInProgress = true;
            if($scope.searchMedia == "") {
                MediaService.GetAllFiles($scope.fileLength, $scope.Medias.length).then(function (response) {
                    if (response.success === true && response.data.length > 0) {
                        var fileFactory = new FileFactory();

                        angular.forEach(response.data, function (file, id) {
                            if ($scope.mediaLibrary.GetLastFileCollection().IsFull() === true) {
                                $scope.Medias.splice($scope.Medias.length - 1, 1);
                                $scope.Medias.push($scope.mediaLibrary.GetLastFileCollection().items);
                                $scope.mediaLibrary.PushNewFileCollection();
                            }

                            $scope.mediaLibrary.GetLastFileCollection().AddItem(fileFactory.Create(file), $scope.fileLength);
                        });

                        if ($scope.mediaLibrary.GetLastFileCollection().IsFull() == false) {
                            if ($scope.offset == 0) {
                                $scope.Medias.push($scope.mediaLibrary.GetLastFileCollection().items);
                            }
                            else {
                                if ($scope.mediaLibrary.GetLastFileCollection().items != $scope.Medias[$scope.Medias.length - 1]) {
                                    $scope.Medias.push($scope.mediaLibrary.GetLastFileCollection().items);
                                }
                            }

                            if (Object.keys($scope.Medias[$scope.Medias.length - 1]).length != $scope.fileLength) {
                                $scope.Medias.splice($scope.Medias.length - 1, 1);
                                $scope.Medias.push($scope.mediaLibrary.GetLastFileCollection().items);
                            }
                        }
                        $scope.offset = $scope.offset + Object.keys($scope.Medias[$scope.Medias.length - 1]).length;
                        $scope.mediaOld = $scope.Medias;
                    }
                    $scope.workInProgress = false;
                });
            }
            else{
                SearchService.Search($scope.searchMedia, {'services': ["MediaService"]}).then(function (response) {
                    if (response.success) {
                        $scope.Medias = [];
                        $scope.mediaLibraryTemp = new MediaLibrary();
                        angular.forEach(response.data, function (resp, id) {
                            if (resp.success) {
                                if (resp.data.results.length > 0) {
                                    var fileFactory = new FileFactory();

                                    angular.forEach(resp.data.results, function (file, id) {
                                        if ($scope.mediaLibraryTemp.GetLastFileCollection().IsFull() === true) {
                                            $scope.Medias.splice($scope.Medias.length - 1, 1);
                                            $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                            $scope.mediaLibraryTemp.PushNewFileCollection();
                                        }

                                        $scope.mediaLibraryTemp.GetLastFileCollection().AddItem(fileFactory.Create(file), $scope.fileLength);
                                    });

                                    if ($scope.mediaLibraryTemp.GetLastFileCollection().IsFull() == false) {
                                        if ($scope.offset == 0) {
                                            $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                        }
                                        else {
                                            if ($scope.mediaLibraryTemp.GetLastFileCollection().items != $scope.Medias[$scope.Medias.length - 1]) {
                                                $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                            }
                                        }

                                        if (Object.keys($scope.Medias[$scope.Medias.length - 1]).length != $scope.fileLength) {
                                            $scope.Medias.splice($scope.Medias.length - 1, 1);
                                            $scope.Medias.push($scope.mediaLibraryTemp.GetLastFileCollection().items);
                                        }
                                    }
                                    $scope.offset = $scope.offset + Object.keys($scope.Medias[$scope.Medias.length - 1]).length;
                                }
                                $scope.workInProgress = false;
                            }
                        });
                    }
                });
            }
        }
        /**
         * Permit to add new file on media gallery
         */
        $scope.UploadFile = function (file){
            MediaService.UploadFile(file).then(function(response){
                if($scope.mediaLibrary.GetLastFileCollection().IsFull() == true){
                    $scope.mediaLibrary.PushNewFileCollection();
                    $scope.mediaLibrary.GetLastFileCollection().AddItem(fileFactory.Create(file), $scope.fileLength);
                    $scope.Medias.push($scope.mediaLibrary.GetLastFileCollection().items);
                }else{
                    $scope.mediaLibrary.GetLastFileCollection().AddItem(fileFactory.Create(file), $scope.fileLength)
                    $scope.Medias.splice($scope.Medias.length -1 , 1)
                    $scope.Medias.push($scope.mediaLibrary.GetLastFileCollection().items);
                }
                $scope.mediaOld = $scope.Medias;
            });
        }
        /**
         *Show modal detail on click on edit button to edit or delete a file
         */
        $scope.showDetailsModal = function(file) {
            if( $scope.numOpenModal == 0) {
                $scope.numOpenModal = 1;
                ModalService.showModal({
                    templateUrl: "modal/modal-media-details-view.html",
                    controller: "DemoMediaDetailsModalController",
                    inputs: {
                        title: "File details",
                        submitButton: "OK",
                        cancelButton: "Cancel",
                        file: file
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    $(".modal-content").mouseup(function (e){
                        $scope.numOpenModal = 0;
                    });
                    modal.close.then(function (result) {
                        $scope.numOpenModal = 0;
                        if(angular.isUndefined(result) == false) {
                            if (result[0] == "update") {
                                for (var i = 0; i < $scope.Medias.length; i++) {
                                    if (result[1].id in $scope.Medias[i]) {
                                        $scope.Medias[i][result[1].id] = result[1];
                                        break;
                                    }
                                }
                            }
                            else if (result[0] == "delete") {
                                for (var j = 0; j < $scope.Medias.length; j++) {
                                    if (result[1].id in $scope.Medias[j]) {
                                        delete $scope.Medias[j][result[1].id];
                                        break;
                                    }
                                }
                                var firstId = undefined;
                                for (var i = 0; i < $scope.Medias.length; i++) {
                                    if (Object.keys($scope.Medias[i]).length < $scope.fileLength) {
                                        firstId = undefined;
                                        if (angular.isUndefined($scope.Medias[i + 1]) == false) {
                                            for (var pro in $scope.Medias[i + 1]) {
                                                firstId = $scope.Medias[i + 1][pro].id;
                                                break;
                                            }
                                            $scope.Medias[i][firstId] = Object.clone($scope.Medias[i + 1][firstId]);
                                            delete $scope.Medias[i + 1][firstId];
                                        } else {
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
            }
        }
        /**
         * Permit to close modal
         */
        $scope.closeComplex = function(result) {
            close(result, 500);
            $('.modal-backdrop').remove();
        }
    }
    angular
        .module('app')
        .controller('DemoComplexModalController', DemoComplexModalController);
    /**
     * Complex controller modal
     */
    DemoComplexModalController.$inject = ['$scope', '$element', 'title', 'submitButton', 'cancelButton', 'close'];
    function DemoComplexModalController($scope, $element, title, submitButton, cancelButton, close) {
        $scope.title = title;
        $scope.submitButton = submitButton;
        $scope.cancelButton = cancelButton;

        $scope.name = null;
        $scope.age = null;

        $scope.closeComplex = function(result) {
            close(result, 500);
        }
    }

    angular
        .module('app')
        .controller('DemoMediaDetailsModalController', DemoMediaDetailsModalController);
    /**
     * Detail controller modal
     */
    DemoMediaDetailsModalController.$inject = ['ModalService', 'MediaService', '$scope', '$element', 'title', 'submitButton', 'cancelButton', 'file', 'close'];
    function DemoMediaDetailsModalController(ModalService, MediaService, $scope, $element, title, submitButton, cancelButton, file, close) {


        $scope.title = title;
        $scope.submitButton = submitButton;
        $scope.cancelButton = cancelButton;

        $scope.file = file;

        /**
         *
         * @param newFile
         * @param oldFile
         */
        $scope.editFile = function (newFile,oldFile){
            MediaService.UpdateFile(newFile,oldFile).then(function(response){
                var fileFactory = new FileFactory();
                var file = fileFactory.Create(response.data);
                var result = [
                    "update",
                    file
                ];
                $scope.closeDetails(result);
            });
        }
        $scope.deleteFile = function (file){
            var result = [
                "delete",
                file
            ];
            $scope.closeDetails(result);
        }
        $scope.closeDetails = function(result) {
            close(result, 500);
        }

    }
})();