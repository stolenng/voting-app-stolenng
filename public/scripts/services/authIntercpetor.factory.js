(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('myInterceptor', myInterceptor);

	myInterceptor.$inject = ['$q', '$window'];

	function myInterceptor($q, $window) {
		
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                //    $state.go('signin');
                }
                return $q.reject(response);
            }
        };
	}
})();