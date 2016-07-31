(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('signInController', signInController);

    signInController.$inject = ['$rootScope', '$scope', '$state', 'SweetAlert', '$users', '$window'];

    function signInController($rootScope, $scope, $state, SweetAlert, $users, $window) {
        init();

        function init() {

            $scope.signIn = signIn;



            $scope.errors = {
                'username': false,
                'password': false
            };


        }

        function signIn() {

            var userData = {
                username: $scope.username,
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


            if (userData.password == undefined || userData.password.length < 4) {
                $scope.errors.password = true;
                formStatus = false;
                errorString += "Password Should Be At Least 4 Digits/Letters \n";
            }
            else {
                $scope.errors.password = false;
            }


            if (!formStatus) {
                SweetAlert.swal("Dear Friend", errorString, "error");
            }
            else {
                $users.auth(userData).then(function(data) {
                    if (data.data.success) {
                        $window.sessionStorage.token = data.data.token;
                        SweetAlert.swal({
                                title: "Success !",
                                text: "You Successfully Logged In !, Accept To Continue",
                                type: "success"
                            },
                            function() {
                                $state.go('main');
                                $rootScope.userLogged = true;
                            });



                    }
                    else {
                        delete $window.sessionStorage.token;
                        SweetAlert.swal("ERROR !", data.data.message + " \n Please Try Again!", "error");
                    }
                });

            }

        }



    }
})();