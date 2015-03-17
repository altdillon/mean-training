angular.module('app').controller('maSignupCtrl', function($scope, maUser, maNotifier, $location, maAuth){
	$scope.signup = function() {
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstName: $scope.fname,
			lastName: $scope.lname
		};

		maAuth.createUser(newUserData).then(function() {
			maNotifier.notify('User account created!');
			$location.path('/');
		}, function(reason) {
			maNotifier.error(reason);
		});
	}
})