angular.module('app').controller('maNavbarLoginCtrl', function($scope, $http, maIdentity, maNotifier, maAuth) {
    $scope.identity = maIdentity;
    $scope.signin = signin;

    function signin(username, password) {
        maAuth.authenticateUser(username, password).then(function(success){
        	if (success) {
        		maNotifier.notify('You have successfully signed in!');
        	} else {
        		maNotifier.notify('Username / password combination incorrect')
        	}
        });
    };
});
