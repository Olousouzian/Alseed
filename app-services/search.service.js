(function () {
    'use strict';

    angular
        .module('app')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$q', '$injector', '$cookieStore', '$rootScope', 'FlashService'];
    function SearchService($q, $injector, $cookieStore, $rootScope, FlashService) {
    	var service = {};

    	service.Search = Search;

    	initService();    	

    	return service;

    	/**
    	 * initService()
    	 *
    	 * @return void
    	 */
    	function initService() {
    		$rootScope.availableSearchProviders = _getAvailableSearchProviders();

    		// Check for each service if search method is defined
    		angular.forEach($rootScope.availableSearchProviders, function(provider, key) {
    			var serviceInstance = $injector.get(provider);

    			// If service is not defined or _search function does not exists, remove provider
    			if (typeof serviceInstance !== 'object' || typeof serviceInstance.Search !== 'object') {
    				$rootScope.availableSearchProviders.slice(key, 1);
    			}
    		});
    	}

    	/**
    	 * Search() returns results hash
    	 *
    	 * @param {string} expression
    	 * @param {object} options
    	 * @return {object} results
    	 */
    	function Search(expression, options) {
    		var deffered = $q.defer();

    		try {
    			if (!expression)
    				throw "Expression cannot be empty !";

    			var defaultOptions = _getDefaultOptions();
    			options = angular.extend({}, options, defaultOptions);

    			var promises = [];

    			angular.forEach(options.services, function(service, key) {
    				if (_checkAvailability(service) === false)
    					throw "Service " + service + " is not available for search !"; 

    				var serviceInstance = $injector.get(service);
    				var promise = serviceInstance.Search(expression);
    				promises.push(promise);
    			});

    			$q.all(promises).then(function(datas) {
    				var success = Object.clone(SuccessResponse);
    				success.data = datas;
    				deffered.resolve(success);
    			});
    		} catch(err) {
    			console.log(err);
    			var error = Object.clone(ErrorResponse);
    			error.message = "SearchService : " + err;
    			
    			deffered.reject(error);
    		}

    		return deffered.promise;
    	}

    	// Private functions
    	/**
    	 * _getAvailableSearchProviders() returns list of services
    	 * 
    	 * @return {array}
    	 */
    	function _getAvailableSearchProviders() {
    		return ['UserService'];
    	}

    	/**
    	 * _checkAvailability() returns boolean
    	 *
    	 * @param {string} service
    	 * @return {boolean|object} result
    	 */
    	function _checkAvailability(service) {
    		if ($rootScope.availableSearchProviders.indexOf(service) != -1)
    			return true;

    		return false;
    	}

    	/**
    	 * _getDefaultOptions()
    	 *
    	 * @return {object}
    	 */
    	function _getDefaultOptions() {
    		return {
    			'services': $rootScope.availableSearchProviders,
    			'order': 'natural'
    		};
    	}
    }
})();