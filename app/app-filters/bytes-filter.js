(function(){
    'use strict';
    /**
     * @memberof app
     * @ngdoc filter
     * @name bytesFilter
     * @param {int} bytes Bytes from file
     * @description
     * Permit to initialize bytes from file
     */
    angular.module('app')
        .filter('bytes', bytesFilter);

    function bytesFilter() {
        return function(bytes, precision) {
            bytes = parseFloat(bytes);
            if (isNaN(bytes) || !isFinite(bytes)) {
                return '-';
            }
            if (typeof precision === 'undefined') {
                precision = 1;
            }
            var units = ['octets', 'ko', 'Mo', 'Go', 'To', 'Po'],
            
            number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        }
    }
})();