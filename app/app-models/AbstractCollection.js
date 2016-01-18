var AbstractCollection = function() {
    this.items = {};
    this.full = false;
    this.capacity = 20;
}

AbstractCollection.prototype = {
    AddItem: function(item, capacity) {
        this.capacity = capacity;
        // The collection is indexed by id field
        // If this field does not exist, item is not added

        if (angular.isUndefined(item.id) === false && this.full === false) {
           this.items[item.id] = item;
           if(Object.keys(this.items).length === this.capacity){
               this.full = true;
           }
        }
        
        return this;
    },
    RemoveItem: function(id) {
        if (id in this.items) {
            this.items.slice(id, 1);
        }

        return this;
    },
    UpdateItem: function(item) {
        if (angular.isUndefined(item.id) === false && item.id in this.items) {
            this.items[item.id] = item;
        }

        return this;
    },
    GetItem: function(id) {
        if (id in this.items) {
            return  this.items[id];
        }

        return {};
    },
    GetItems: function() {
        return this.items;
    },
    GetLength: function() {
        return this.items.length;
    },
    IsFull: function(){
        return this.full;
    }
}