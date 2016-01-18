/**
 * @memberof app
 * @ngdoc model
 * @name AbstractCollection
 * @description  object with 3 attribute
 * @attr {file} items list of file
 * @attr {boolean} full permit to know if items is full
 * @attr {int} capacity max file on items
 */
var AbstractCollection = function() {
    this.items = {};
    this.full = false;
    this.capacity = 20;
}

AbstractCollection.prototype = {
    /**
     * Add an item on items
     * @memberof AbstractCollection
     * @param {file} item
     * @param {int} capacity Int to check if items is full
     */
    AddItem: function(item, capacity) {
        this.capacity = capacity;
        if (angular.isUndefined(item.id) === false && this.full === false) {
           this.items[item.id] = item;
           if(Object.keys(this.items).length === this.capacity){
               this.full = true;
           }
        }
        return this;
    },
    /**
     * Remove an item on items
     * @memberof AbstractCollection
     * @param {int} id id from file selected
     */
    RemoveItem: function(id) {
        if (id in this.items) {
            this.items.slice(id, 1);
        }

        return this;
    },
    /**
     * Update an item on items
     * @memberof AbstractCollection
     * @param {file} item
     */
    UpdateItem: function(item) {
        if (angular.isUndefined(item.id) === false && item.id in this.items) {
            this.items[item.id] = item;
        }

        return this;
    },
    /**
     * Get an item on items
     * @memberof AbstractCollection
     * @param {int} id
     */
    GetItem: function(id) {
        if (id in this.items) {
            return  this.items[id];
        }

        return {};
    },
    /**
     * Get items
     * @memberof AbstractCollection
     */
    GetItems: function() {
        return this.items;
    },
    /**
     * Get length from items
     * @memberof AbstractCollection
     */
    GetLength: function() {
        return this.items.length;
    },
    /**
     * Return attribute full
     * @memberof AbstractCollection
     */
    IsFull: function(){
        return this.full;
    }
}