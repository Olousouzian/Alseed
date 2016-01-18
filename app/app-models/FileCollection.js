var FileCollection = function() {
    AbstractCollection.call(this);
}

FileCollection.prototype = Object.create(AbstractCollection.prototype);
FileCollection.prototype.constructor = FileCollection;