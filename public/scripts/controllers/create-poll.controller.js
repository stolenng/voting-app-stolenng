(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('createPollController', createPollController);

    createPollController.$inject = ['$rootScope', '$scope', '$state', 'SweetAlert', '$users', '$window'];

    function createPollController($rootScope, $scope, $state, SweetAlert, $users, $window) {
        init();

        function init() {

            $scope.options = [];


        }




    }
})();