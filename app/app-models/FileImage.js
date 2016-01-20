/**
 * @memberof app
 * @ngdoc model
 * @name FileImage
 * @description  object with 2 attributes. Instanciate file type image
 * @param {array} options array contain info about file
 * @attr {string} type type from file
 * @attr {Dimensions} dimensions dimensions from file
 */
var FileImage = function(options) {
    AbstractFile.call(this, options);
    this.type = 'image';
    this.dimensions = new Dimensions(options);
};

FileImage.prototype = Object.create(AbstractFile.prototype, {
    /**
     * Get type from file
     * @memberof FileImage
     */
    GetType: function() {
        return this.type;
    },
    /**
     * Get dimensions from file
     * @memberof FileImage
     */
    GetDimensions: function() {
        return this.dimensions;
    },
    /**
     * Set type from file
     * @memberof FileImage
     */
    SetType: function(type) {
        this.type = type;
        return this;
    },
    /**
     * Set dimensions from file
     * @memberof FileImage
     */
    SetDimensions: function(dimensions) {
        if (dimensions !== undefined) {
            this.GetDimensions().SetWidth(dimensions.width);
            this.GetDimensions().SetHeight(dimensions.height);
        }
    }
});
FileImage.prototype.constructor = FileImage;