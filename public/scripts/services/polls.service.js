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
	        return $http.get(baseUrl + "/polls/single" + "/?pollId=" + pollData.pollId  );
	    }
	    
	    function getAllPosts(userName) {
	    	return $http.get(baseUrl + "/polls/get" + "/?userName=" +userName);
	    }
	    
	    function vote(voteData) {
	    	return $http.post(baseUrl + "/polls/vote", voteData);
	    }
	    
	    function deletePoll(pollId) {
	    	return $http.delete(baseUrl + "/api/polls/delete/" + pollId);
	    }

        
		
		return { 
		    createPoll : createPoll,
		    getSinglePoll : getSinglePoll,
		    getAllPosts: getAllPosts,
		    vote : vote,
		    deletePoll: deletePoll
		}
	}
})();