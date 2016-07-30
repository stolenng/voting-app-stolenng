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

myApp.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('myInterceptor');
}]);

myApp.run(['$state', '$rootScope', '$window', function($state, $rootScope, $window) {
    if($window.sessionStorage.token) {
        $rootScope.userLogged = true;
    }
    else {
        $rootScope.userLogged = false;
    }
        console.log($rootScope.userLogged);

}])
