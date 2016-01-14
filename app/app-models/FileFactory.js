var FileFactory = function() {
    this.fileClass = null;
};

FileFactory.prototype = {
    Create: function(options) {
        var fileType = angular.isUndefined(options.fileType) === false ? options.fileType : undefined;

        switch(fileType) {
            case 'image':
                this.fileClass = FileImage; 
                break;
            case 'video':
                this.fileClass = FileVideo;
                break;
            case 'archive':
                this.fileClass = FileArchive;
                break;
            case 'document':
            default:
                this.fileClass = FileDocument;
                break; 
        }
        return new this.fileClass(options);
    }
};