var myApp = angular.module('myApp', ['ui.router', 'chart.js']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    

    
    $stateProvider.
        state('main', {
            url : '/home',
            templateUrl: '/public/scripts/views/home.html',
            controller: 'homeController'
        }).
        state('sign-up', {
            url : '/signup',
            templateUrl: '/public/scripts/views/sign-up.html',
            controller: 'signUpController'
        });
        
}]);