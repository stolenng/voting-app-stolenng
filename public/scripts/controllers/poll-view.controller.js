(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('pollViewController', pollViewController);

    pollViewController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$polls', 'SweetAlert'];

    function pollViewController($rootScope, $scope, $state, $stateParams, $polls, SweetAlert) {
        init();

        function init() {

            getPollData();
            $scope.addVote = "Choose You Weapon";
            $scope.voteMe = voteMe;

        }
        
        function voteMe() {
            console.log($scope.addVote);
        }

        function getPollData() {

            var pollName = $stateParams.pollName;
            $scope.data = [];
            $scope.labels = [];
            $scope.options = { legend: { display: true } };

            if (!pollName) {
                return null;
            }

            var pollData = {
                'userName': $rootScope.userName,
                'title': pollName
            };

            //console.log(pollData);



            $polls.getSinglePoll(pollData).then(function(data) {
                if (!data.data) {
                    SweetAlert.swal({
                            title: "Error !",
                            text: "Poll Doesn't Exists !",
                            type: "error"
                        },
                        function() {
                            $state.go('main');
                        });
                }

                angular.forEach(data.data.votes, function(value, key) {
                    $scope.labels.push(value.name);
                    $scope.data.push(value.count);
                });
                
                $scope.data[0] =4;
                $scope.data[1] =5;


                console.log(data);
            });
        }


    }
})();