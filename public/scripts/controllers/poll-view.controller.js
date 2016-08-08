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
            $scope.voteMe = voteMe;
            $scope.deletePoll = deletePoll;
            $scope.canAddOption = $rootScope.userLogged;
            $scope.newOption = newOption;
            
            $scope.pollUrl = window.location.href;
        }
        
        function newOption(optionName) {
            console.log(optionName);
            if(optionName == undefined || optionName == "") {
                  SweetAlert.swal({
                        title: "Error !",
                        text: "Please Enter Vote",
                        type: "error"
                    },
                    function() {
                           
                });
                 return;
            }
            
            if($scope.labels.indexOf(optionName) != -1) {
                  SweetAlert.swal({
                        title: "Error !",
                        text: "Vote Already Exists",
                        type: "error"
                    },
                    function() {
                           
                });
                 return;
            }
            
            var option = {
              'name': optionName,
              'count': 0
            };
            
            var pollData = {
              'pollId' : $scope.postId,
              'option' : option
            };
            
            $polls.addNewOption(pollData).then(function (data) {
               if(data.data.success){
                     SweetAlert.swal({
                            title: "Success !",
                            text: data.data.message,
                            type: "success"
                        },
                        function() {
                            $scope.labels.push(option.name);
                            $scope.data.push(0);
                    });

                }
            });
            
            $scope.canAddOption = true;
            console.log(option);
        }
        
        function voteMe() {
            if($scope.addVote == undefined) {
                 SweetAlert.swal({
                            title: "Error !",
                            text: "Please Choose Your Vote!",
                            type: "error"
                        });
                return ;
            }
            var pollId = $stateParams.pollId;
            var voteIndex = parseInt($scope.addVote);
            
            var voteLabel = $scope.labels[voteIndex];
            
            var voteAdditionData = {
                'pollId': pollId,
                'voteName': voteLabel,
                'loggedUser': $rootScope.userLogged,
            };
            
            if($rootScope.userLogged) {
                voteAdditionData.userName = $rootScope.userName;
            }
            
            $polls.vote(voteAdditionData).then(function (data) {
               console.log(data); 
               if(data.data.success){
                $scope.data[voteIndex]++;
                 SweetAlert.swal("Success !", data.data.message , "success");   
               }
               else {
                    SweetAlert.swal("ERROR !", data.data.message , "error");
               }
            });
            

        }
        
        function deletePoll () {
            var postId =  $scope.postId;
            
            console.log(postId);
            
            $polls.deletePoll(postId).then(function (data){
                if(data.data.success){
                     SweetAlert.swal({
                                title: "Success !",
                                text: data.data.message,
                                type: "success"
                            },
                            function() {
                                $state.go('main');
                    });

                }
            });
        }

        function getPollData() {

            var pollId = $stateParams.pollId;
            $scope.data = [];
            $scope.labels = [];
            $scope.options = { legend: { display: true } };

            if (!pollId) {
                return null;
            }

            var pollData = {
                'userName': $rootScope.userName,
                'pollId': pollId
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
                
                if(pollData.userName == data.data.userName) {
                    $scope.canDelete = true;
                }
                
                $scope.postId = data.data._id;
                $scope.pollName = data.data.title;

                angular.forEach(data.data.votes, function(value, key) {
                    $scope.labels.push(value.name);
                    $scope.data.push(value.count);
                });
                
                

            });
        }


    }
})();