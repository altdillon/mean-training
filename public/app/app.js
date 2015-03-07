angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
    	admin: {auth: function(maAuth) {
    		return maAuth.authorizeCurrentUserForRoute('admin');
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
	    });
	});

angular.module('app').run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});


