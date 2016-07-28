var myApp = angular.module('myApp', ['ui.router', 'chart.js', 'oitozero.ngSweetAlert']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');

    $stateProvider.
    state('main', {
        url: '/home',
        templateUrl: '/public/scripts/views/home.html',
        controller: 'homeController'
    }).
    state('signup', {
        url: '/signup',
        templateUrl: '/public/scripts/views/sign-up.html',
        controller: 'signUpController'
    });

}]);

myApp.run(['$state', '$rootScope', function($state, $rootScope) {
    
    //$state.reload('main');

    
}])

