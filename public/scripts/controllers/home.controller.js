(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('homeController', homeController);

	homeController.$inject = ['$rootScope', '$scope', '$state', '$polls'];

	function homeController($rootScope, $scope, $state, $polls) {
		init();

		function init() {
			
			initPolls();
			
			$scope.goToPoll = goToPoll;
		}
		
		function initPolls() {
			$polls.getAllPosts().then(function (data){
				$scope.polls = data.data;	
			});
		}
		
		function goToPoll(id) {
            $state.go('poll-view', { 'pollId' : id });
		}
		
	
	}
})();