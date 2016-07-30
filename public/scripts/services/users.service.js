(function() {
	'use strict';

	angular
		.module('myApp')
		.service('$users', usersService);

	usersService.$inject = ['$rootScope', '$http'];

	function usersService($rootScope, $http) {
		
		var baseUrl = window.location.origin;
	    
	    function registerUser(userData) {
	        return $http.post(baseUrl + "/register", userData);
	    }
	    
	    function authUser(userData) {
	        return $http.post(baseUrl + "/auth", userData);
	    }
        
		
		return { 
		    register : registerUser,
		    auth : authUser
		}
	}
})();