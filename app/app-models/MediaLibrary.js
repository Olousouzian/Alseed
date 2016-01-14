var MediaLibrary = function (){
    this.arrayFile = [];
    this.PushNewFileCollection();
}
MediaLibrary.prototype = {
    GetLastFileCollection: function(){
        return this.arrayFile[this.arrayFile.length-1];
    },
    PushNewFileCollection: function(){
        var collection = new FileCollection();
        this.arrayFile.push(collection);
        return true;
    }
}