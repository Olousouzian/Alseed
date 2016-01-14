var FileImage = function(options) {
    AbstractFile.call(this, options);
    this.type = 'image';
    this.dimensions = new Dimensions(options);
};

FileImage.prototype = Object.create(AbstractFile.prototype, {
    GetType: function() {
        return this.type;
    },
    GetDimensions: function() {
        return this.dimensions;
    },
    SetType: function(type) {
        this.type = type;
        return this;
    },
    SetDimensions: function(dimensions) {
        if (dimensions !== undefined) {
            this.GetDimensions().SetWidth(dimensions.width);
            this.GetDimensions().SetHeight(dimensions.height);
        }
    }
});
FileImage.prototype.constructor = FileImage;