var Dimensions = function(options) {
    this.width = null;
    this.SetWidth(options.dimensions.width);
    
    this.height = null;
    this.SetHeight(options.dimensions.height);
};

Dimensions.prototype = {
    SetWidth: function(width) {
        if (width !== undefined)
            this.width = Math.ceil(width);
    },
    SetHeight: function(height) {
        if (height !== undefined)
            this.height = Math.ceil(height);
    }
};