(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('signUpController', signUpController);

	signUpController.$inject = ['$rootScope', '$scope', '$location'];

	function signUpController($rootScope, $scope, $location) {
		init();

		function init() {
		}
		
	
	}
})();