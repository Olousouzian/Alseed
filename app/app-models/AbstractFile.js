var AbstractFile = function(options) {
    this.id = options.id;
    this.name = options.name;
    this.weight = options.weight;
    this.url = options.url;
    this.extension = options.extension;
};

AbstractFile.prototype = {
    GetId: function() {
        return this.id;
    },
    GetName: function() {
        return this.name;
    },
    GetWeight: function() {
        return this.weight;
    },
    GetUrl: function() {
        return this.url;
    },
    GetExtension: function() {
        return this.extension;
    },
    SetId: function(id) {
        this.id = id;
        return this;
    },
    SetName: function(name) {
        this.name = name;
        return this;
    },
    SetWeight: function(weight) {
        this.weight = weight;
        return this;
    },
    SetUrl: function(url) {
        this.url = url;
        return this;
    },
    SetExtension: function(extension) {
        this.extension = extension;
        return this;
    }
};