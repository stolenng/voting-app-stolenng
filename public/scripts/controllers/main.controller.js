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
		}
		
		function redirectTo (view) {
		    console.log(view);
		    $state.go(view);
		}
	}
})();