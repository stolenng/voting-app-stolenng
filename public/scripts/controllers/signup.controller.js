(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('signUpController', signUpController);

	signUpController.$inject = ['$rootScope', '$scope', '$state', 'SweetAlert', '$users', '$window'];

	function signUpController($rootScope, $scope, $state, SweetAlert, $users, $window) {
		init();

		function init() {

			$scope.signMeUp = signMeUp;

			$scope.firstTime = false;


			$scope.errors = {
				'username': false,
				'email': false,
				'password': false
			};

			$scope.$watch('username', function() {
				if ($scope.firstTime == true) {
					if ($scope.username == undefined || $scope.username == "") {
						$scope.errors.username = true;
					}
					else {
						$scope.errors.username = false;
					}
				}
			});

			$scope.$watch('email', function() {
				if ($scope.firstTime == true) {
					if (!validateEmail($scope.email)) {
						$scope.errors.email = true;
					}
					else {
						$scope.errors.email = false;
					}
				}
			});

			$scope.$watch('password', function() {
				if ($scope.firstTime == true) {
					if ($scope.password == undefined || $scope.password.length < 4) {
						$scope.errors.password = true;
					}
					else {
						$scope.errors.password = false;
					}
				}
			});
		}

		function signMeUp() {

			var userData = {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			};

			var errorString = "The Following Fields Are Incorrect : \n";

			var formStatus = true;

			if (userData.username == undefined || userData.username == "") {
				$scope.errors.username = true;
				formStatus = false;
				errorString += "Username Is Empty \n";
			}
			else {
				$scope.errors.username = false;
			}

			if (!validateEmail(userData.email)) {
				$scope.errors.email = true;
				formStatus = false;
				errorString += "Email Is Incorrect \n";
			}
			else {
				$scope.errors.email = false;
			}

			if (userData.password == undefined || userData.password.length < 4) {
				$scope.errors.password = true;
				formStatus = false;
				errorString += "Password Should Be At Least 4 Digits/Letters \n";
			}
			else {
				$scope.errors.password = false;
			}

			$scope.firstTime = true;

			if (!formStatus) {
				SweetAlert.swal("Dear Friend", errorString, "error");
			}
			else {
				$users.register(userData).then(function(data, err) {
					if (data.data.success) {
						$users.auth(userData).then(function(data) {
							if (data.data.success) {
								$window.sessionStorage.token = data.data.token;
		                        $window.sessionStorage.userName = data.data.userName;
								SweetAlert.swal({
									title : "Success !",
									text: "You Successfully Registered, Accept To Continue",
									type:  "success"
								},
								function() {
									$state.go('main');
									$rootScope.userLogged = true;
	                                $rootScope.userName = data.data.userName;
								});
	
							}
							else{
								delete $window.sessionStorage.token;
								SweetAlert.swal("ERROR !", data.data.message + " \n Please Try Again!", "error");
							}
						});

					}
					else {
						SweetAlert.swal("ERROR !", data.data.message + " \n Please Try Again!", "error");
					}
				});

			}

		}

		function validateEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

	}
})();