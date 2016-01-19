(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc controller
     * @name DemoController
     * @param ModalService Permit to display and manage modal (simple complex detail modal and  media modal)
     * @param FlashService Permit to display message on scope
     * @param ThemeService Permit to apply different theme following the case of using
     * @param Uploadservice Permit to upload file on server
     * @param rootscope Permit to access the global variable of the app
     * @description
     * Controller permit to see lot of function implement on app like modal.managing theme, upload file
     */
    angular
        .module('app')
        .controller('DemoController', DemoController);
    DemoController.$inject = ['ModalService', 'FlashService', 'ThemeService','UploadService', '$rootScope'];
    function DemoController(ModalService, FlashService, ThemeService, UploadService, $rootScope) {
        var vm = this;
        /**
         * Permit to display simple modal and define Behavior to the closure
         * @memberof DemoController
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
         * Permit to display media modal and define Behavior to the closure
         * @memberof DemoController
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
         * Permit to display complex modal and define Behavior to the closure
         * @memberof DemoController
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
         * Permit to upload a file
         * @memberof DemoController
         * @param {File} file
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
    /**
     * @memberof app
     * @ngdoc controller
     * @name DemoSimpleModalController
     * @param $scope
     * @param $close Permit to define behavior to the closure
     * @description
     * Controller to implement a modal with a simple response (like yes or no)
     */
    angular
        .module('app')
        .controller('DemoSimpleModalController', DemoSimpleModalController);

    DemoSimpleModalController.$inject = ['$scope', 'close'];
    function DemoSimpleModalController($scope, close) {
        $scope.closeSimple = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    }
    /**
     * @memberof app
     * @ngdoc controller
     * @name MediaModalController
     * @param SearchService
     * @param ModalService
     * @param MediaService
     * @param $scope
     * @param title
     * @param submitButton
     * @param cancelButton
     * @param close
     * @description
     * Controller to implement a modal which contain gallery of media
     */
    angular
        .module('app')
        .controller('MediaModalController', MediaModalController);
    MediaModalController.$inject = ['SearchService', 'ModalService', 'MediaService', '$scope', 'title', 'submitButton', 'cancelButton', 'close'];
    function MediaModalController(SearchService, ModalService, MediaService, $scope, title, submitButton, cancelButton, close) {
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

        /**
         * Initialize medialibrary
         * @memberof MediaModalController
         */
        InitController();
        function InitController(){
            $scope.mediaLibrary = new MediaLibrary();
        }

        /**
         * Select file when we click on image and return info about file and close modal
         * @memberof MediaModalController
         * @param {fileFactory} file
         */
        $scope.select = function(file){
            var result = [
                "select",
                file
            ];
            $scope.closeComplex(result);
        }
        /**
         * Permit to search specific files and display its
         * @memberof MediaModalController
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
         * Function call when we open modal, when we scroll or when we search specific file
         * @memberof MediaModalController
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
         * Permit to upload a file when we click on upload button on modal media
         * @memberof MediaModalController
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
         * Permit to display a modal detail when we click on edit button on media modal
         * @memberof MediaModalController
         * @param {fileFactory} file
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
         * function call when we close the modal
         * @memberof MediaModalController
         * @param {array} result contain type of action and file to display(it could be empty)
         */
        $scope.closeComplex = function(result) {
            close(result, 500);
            $('.modal-backdrop').remove();
        }
    }
    /**
     * @memberof app
     * @ngdoc controller
     * @name DemoComplexModalController
     * @param $scope
     * @param title
     * @param submitButton
     * @param cancelButton
     * @param close
     * @description
     * Controller to implement a complex modal
     */
    angular
        .module('app')
        .controller('DemoComplexModalController', DemoComplexModalController);
    DemoComplexModalController.$inject = ['$scope', 'title', 'submitButton', 'cancelButton', 'close'];
    function DemoComplexModalController($scope, title, submitButton, cancelButton, close) {
        $scope.title = title;
        $scope.submitButton = submitButton;
        $scope.cancelButton = cancelButton;

        $scope.name = null;
        $scope.age = null;

        $scope.closeComplex = function(result) {
            close(result, 500);
        }
    }
    /**
     * @memberof app
     * @ngdoc controller
     * @name DemoMediaDetailsModalController
     * @param SearchService
     * @param ModalService
     * @param MediaService
     * @param $scope
     * @param title
     * @param submitButton
     * @param cancelButton
     * @param close
     * @description
     * Controller to implement a detail modal
     */
    angular
        .module('app')
        .controller('DemoMediaDetailsModalController', DemoMediaDetailsModalController);
    DemoMediaDetailsModalController.$inject = ['MediaService', '$scope', 'title', 'submitButton', 'cancelButton', 'file', 'close'];
    function DemoMediaDetailsModalController(MediaService, $scope, title, submitButton, cancelButton, file, close) {


        $scope.title = title;
        $scope.submitButton = submitButton;
        $scope.cancelButton = cancelButton;

        $scope.file = file;

        /**
         * function call when we click on edit button of modal
         * @memberof DemoMediaDetailsModalController
         * @param {File} newFile
         * @param {fileFactory} oldFile
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
        /**
         * function call when we delete a file
         * @memberof DemoMediaDetailsModalController
         * @param {fileFactory} file
         */
        $scope.deleteFile = function (file){
            var result = [
                "delete",
                file
            ];
            $scope.closeDetails(result);
        }
        /**
         * function call when we close the modal
         * @memberof DemoMediaDetailsModalController
         * @param {array} result contain type of action and file to display(it could be empty)
         */
        $scope.closeDetails = function(result) {
            close(result, 500);
        }

    }
})();