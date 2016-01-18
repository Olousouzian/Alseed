describe('app.app-service.media-service', function () {
    var file = {
        "files": [
            {
                "id" : "1",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },{
                "id" : "2",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "3",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "4",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "5",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "6",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id": "7",
                "name": "image0",
                "weight": "1",
                "url": "upload/image.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            },
            {
                "id": "8",
                "name": "image0",
                "weight": "1k",
                "url": "upload/image.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            },
            {
                "id": "9",
                "name": "image0",
                "weight": "1k",
                "url": "upload/image.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            },
            {
                "id": "10",
                "name": "image0",
                "weight": "1k",
                "url": "upload/image.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            },
            {
                "id": "11",
                "name": "image0",
                "weight": "1k",
                "url": "upload/image.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            },
            {
                "id" : "12",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },{
                "id" : "13",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "14",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "15",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "16",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id" : "17",
                "name" : "image0",
                "weight" :"1k",
                "url" : "upload/image.png",
                "extension" : "png",
                "fileType" : "image",
                "dimensions" : {
                    "width" : "100",
                    "height": "200"
                }
            },
            {
                "id": "18",
                "name": "image0",
                "weight": "1k",
                "url": "upload/image.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            },
            {
                "id": "19",
                "name": "image0",
                "weight": "1k",
                "url": "upload/image.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            }
        ]
    };
    var MediaService;
    var httpBackend;
    var UploadService;
    beforeEach(module('app.media'));
    beforeEach(module('app.upload'));
    beforeEach(inject(function(_MediaService_) {
        MediaService = _MediaService_;
    }));
    beforeEach(inject(function(_UploadService_) {
        UploadService = _UploadService_;
    }));
    beforeEach(inject(function($httpBackend) {
        httpBackend = $httpBackend;
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    it("return all media",function() {
        var url = '/media/allMedia',
            successCallback = jasmine.createSpy();
        // Create expectation
        httpBackend
            .when('GET', url)
            .respond(file);
        MediaService.GetAllFiles(20,20);
        httpBackend.flush();
    });
});