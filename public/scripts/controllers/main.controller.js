(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('mainController', mainController);

	mainController.$inject = ['$rootScope', '$scope', '$state', '$window'];

	function mainController($rootScope, $scope, $state, $window) {
		
		init();

		function init() {
			
		    $scope.redirectTo = redirectTo;
		    $scope.state = $state;
		    $scope.logOut = logOut;

		}

		
		function redirectTo (view) {
			
			if($state.current.name != view)
			{
		    	$state.go(view);
			}
		}
		
		function logOut() {
			delete $window.sessionStorage.token;
			$rootScope.userLogged = false;
			$rootScope.userName = null;
			$state.go('main');
		}
	}
})();