(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('mainController', mainController);

	mainController.$inject = ['$rootScope', '$scope', '$state'];

	function mainController($rootScope, $scope, $state) {
		
		init();

		function init() {
			
		    $scope.redirectTo = redirectTo;
		    $scope.state = $state;

		}

		
		function redirectTo (view) {
			
			if($state.current.name != view)
			{
		    	$state.go(view);
			}
		}
	}
})();