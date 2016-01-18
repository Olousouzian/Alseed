/**
 * @memberof app
 * @ngdoc model
 * @name FileCollection
 * @description  object call AbstractCollection
 */
var FileCollection = function() {
    AbstractCollection.call(this);
}

FileCollection.prototype = Object.create(AbstractCollection.prototype);
FileCollection.prototype.constructor = FileCollection;