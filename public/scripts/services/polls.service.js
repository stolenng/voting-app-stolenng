(function() {
	'use strict';

	angular
		.module('myApp')
		.service('$polls', pollsService);

	pollsService.$inject = ['$rootScope', '$http'];

	function pollsService($rootScope, $http) {
		
		var baseUrl = window.location.origin;
	    
	    function createPoll(pollData) {
	        return $http.post(baseUrl + "/api/polls/create", pollData);
	    }
	    
	    function getSinglePoll(pollData) {
	        return $http.get(baseUrl + "/api/polls/single" + "/?userName=" + pollData.userName + "&title=" +pollData.title );
	    }

        
		
		return { 
		    createPoll : createPoll,
		    getSinglePoll : getSinglePoll
		}
	}
})();