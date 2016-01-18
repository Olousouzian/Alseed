/**
 * @memberof app
 * @ngdoc model
 * @name FileFactory
 * @description  object with 1 attribute. Instanciate file with good type
 * @attr {file} fileClass type from file
 */
var FileFactory = function() {
    this.fileClass = null;
};

FileFactory.prototype = {
    /**
     * Create a file
     * @memberof FileFactory
     * @param {array} options array contains all information about file ( name, url ...)
     */
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