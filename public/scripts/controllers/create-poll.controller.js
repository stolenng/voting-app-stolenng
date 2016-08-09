(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('createPollController', createPollController);

    createPollController.$inject = ['$rootScope', '$scope', '$state', 'SweetAlert', '$users', '$window', '$polls'];

    function createPollController($rootScope, $scope, $state, SweetAlert, $users, $window, $polls) {
        init();

        function init() {


            $scope.createPoll = createPoll;
            
            $scope.pollOptions = [ { name : "Option Number 1", 'count' : 0 }, { name : "Option Number 2", 'counter' : 0 }];

        }
        
        function createPoll() {
            
            var pollFlag = true;
            var counter = 0;

            if($scope.pollOptions.length < 2) {
                SweetAlert.swal("ERROR !", "Please Choose At Least 2 Voting Options \n Please Try Again!", "error");
                pollFlag = false;
            }
            else {
                pollFlag = true;
                counter++;
            }
            
            if($scope.pollName == undefined || $scope.pollName.length < 4 ){
                SweetAlert.swal("ERROR !", "Please Insert A Poll Name With At Least 4 Letters \n Please Try Again!", "error");
                pollFlag = false;
            }
            else{
                pollFlag = true;
                counter++;
            }

            if(counter == 2) {
                var poll =  {
                  pollName: $scope.pollName,
                  userName: $rootScope.userName,
                  votes : $scope.pollOptions
                };
                
                $polls.createPoll(poll).then(function (data){
                    if(data.data.success){
                        console.log(data.data);
                        SweetAlert.swal({
                            title: "Success !",
                            text: "Your Poll Was Successfully Created !",
                            type: "success"
                        },
                        function() {
                            $state.go('poll-view', { 'pollId' : data.data.data._id });
                        });
                    }
                    else{
                        console.log(data);
                        SweetAlert.swal("ERROR !", data.data.message + "\n Please Try Again!", "error");
                    }
                })
                
            }

            
            
        }





    }
})();