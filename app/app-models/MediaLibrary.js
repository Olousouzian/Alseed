/**
 * @memberof app
 * @ngdoc model
 * @name MediaLibrary
 * @description  object with 1 attributes
 * @attr {array} arrayFile contain fileCollection
 */
var MediaLibrary = function (){
    this.arrayFile = [];
    this.PushNewFileCollection();
}
MediaLibrary.prototype = {
    /**
     * Get last file collection from file
     * @memberof MediaLibrary
     */
    GetLastFileCollection: function(){
        return this.arrayFile[this.arrayFile.length-1];
    },
    /**
     * Push new fileCollection on arrayFile
     * @memberof MediaLibrary
     */
    PushNewFileCollection: function(){
        var collection = new FileCollection();
        this.arrayFile.push(collection);
        return true;
    }
}