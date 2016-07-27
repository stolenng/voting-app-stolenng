(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('homeController', homeController);

	homeController.$inject = ['$rootScope', '$scope', '$location'];

	function homeController($rootScope, $scope, $location) {
		init();

		function init() {
		    
		}
		
	
	}
})();