/**
 * @memberof app
 * @ngdoc model
 * @name Dimensions
 * @description  object with 2 attribute
 * @param {Object} options contain width and height
 * @attr {int} width width from file
 * @attr {int} height from file
 */
var Dimensions = function(options) {
    this.width = null;
    this.SetWidth(options.dimensions.width);
    
    this.height = null;
    this.SetHeight(options.dimensions.height);
};

Dimensions.prototype = {
    /**
     * Set width from file
     * @memberof Dimensions
     * @param {int} width
     */
    SetWidth: function(width) {
        if (width !== undefined)
            this.width = Math.ceil(width);
    },
    /**
     * Set height from file
     * @memberof Dimensions
     * @param {int} height
     */
    SetHeight: function(height) {
        if (height !== undefined)
            this.height = Math.ceil(height);
    }
};