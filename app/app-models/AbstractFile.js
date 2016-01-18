/**
 * @memberof app
 * @ngdoc model
 * @name AbstractFile
 * @description  object with 5 attributes
 * @attr {int} id id from file
 * @attr {string} name name from file
 * @attr {int} weight weight from file
 * @attr {string} url url from file
 * @attr {string} extension extension from file (png,jpeg...)
 */
var AbstractFile = function(options) {
    this.id = options.id;
    this.name = options.name;
    this.weight = options.weight;
    this.url = options.url;
    this.extension = options.extension;
};

AbstractFile.prototype = {
    /**
     * Get id from file
     * @memberof AbstractFile
     */
    GetId: function() {
        return this.id;
    },
    /**
     * Get name from file
     * @memberof AbstractFile
     */
    GetName: function() {
        return this.name;
    },
    /**
     * Get weight from file
     * @memberof AbstractFile
     */
    GetWeight: function() {
        return this.weight;
    },
    /**
     * Get url from file
     * @memberof AbstractFile
     */
    GetUrl: function() {
        return this.url;
    },
    /**
     * Get extension from file
     * @memberof AbstractFile
     */
    GetExtension: function() {
        return this.extension;
    },
    /**
     * Set id from file
     * @memberof AbstractFile
     */
    SetId: function(id) {
        this.id = id;
        return this;
    },
    /**
     * Set name from file
     * @memberof AbstractFile
     */
    SetName: function(name) {
        this.name = name;
        return this;
    },
    /**
     * Set weight from file
     * @memberof AbstractFile
     */
    SetWeight: function(weight) {
        this.weight = weight;
        return this;
    },
    /**
     * Set url from file
     * @memberof AbstractFile
     */
    SetUrl: function(url) {
        this.url = url;
        return this;
    },
    /**
     * Set extension from file
     * @memberof AbstractFile
     */
    SetExtension: function(extension) {
        this.extension = extension;
        return this;
    }
};