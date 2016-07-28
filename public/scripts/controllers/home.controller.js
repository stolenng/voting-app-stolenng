(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('homeController', homeController);

	homeController.$inject = ['$rootScope', '$scope', '$state'];

	function homeController($rootScope, $scope, $state) {
		init();

		function init() {
		}
		

		
	
	}
})();