angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
    	admin: {auth: function(maAuth) {
    		return maAuth.authorizeCurrentUserForRoute('admin');
    	}},
    	user: {auth: function(maAuth) {
    		return maAuth.authorizeAuthenticatedUserForRoute();
    	}}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'maMainCtrl'
	    }).when('/admin/users', {
	        templateUrl: '/partials/admin/user-list',
	        controller: 'maUserListCtrl',
	        resolve: routeRoleChecks.admin
	    }).when ('/signup', {
	    	templateUrl: '/partials/account/signup',
	    	controller: 'maSignupCtrl'
	    }).when ('/profile', {
	    	templateUrl: '/partials/account/profile',
	    	controller: 'maProfileCtrl',
	    	resolve: routeRoleChecks.user
	    }).when('/authorize/facebook/callback', {
	    	templateUrl: '/partials/account/facebook-callback'
	    });
	});

angular.module('app').run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});


