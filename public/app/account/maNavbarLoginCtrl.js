angular.module('app').controller('maNavbarLoginCtrl', function($scope, $location, $window, maIdentity, maNotifier, maAuth) {
    $scope.identity = maIdentity;
    $scope.signin = function(username, password) {
        maAuth.authenticateUser(username, password).then(function(success){
        	if (success) {
        		maNotifier.notify('You have successfully signed in!');
        	} else {
        		maNotifier.notify('Username / password combination incorrect')
        	}
        });
    };
    $scope.signout = function () {
        maAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            maNotifier.notify('You have successfully signed out');
            $location.path('/');
        })
    };
    $scope.authorizeFacebook = function() {
        $window.location = $window.location.protocol + "//" + $window.location.host + $window.location.pathname + "authorize/facebook";
        maAuth.authorizeFacebook().then(function(success){
            $window.location = $window.location.protocol + "//" + $window.location.host + $window.location.pathname + "authorize/facebook/";
            if (success) {
                maNotifier.notify('You have successfully authorized Facebook!');
            } else {
                maNotifier.notify('Facebook authorization failed')
            }
        })
    }
});
