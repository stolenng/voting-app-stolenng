(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('myPollsController', myPollsController);

	myPollsController.$inject = ['$rootScope', '$scope', '$state', '$polls'];

	function myPollsController($rootScope, $scope, $state, $polls) {
		init();

		function init() {
			
			initPolls();
			
			$scope.goToPoll = goToPoll;
		}
		
		function initPolls() {
			$polls.getAllPosts($rootScope.userName).then(function (data){
			    console.log(data);
				$scope.polls = data.data;	
			});
		}
		
		function goToPoll(id) {
            $state.go('poll-view', { 'pollId' : id });
		}
		
	
	}
})();