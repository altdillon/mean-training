angular.module('app').controller('maProfileCtrl', function($scope, maAuth, maIdentity, maNotifier) {
	$scope.email = maIdentity.currentUser.username;
	$scope.fname = maIdentity.currentUser.firstName;
	$scope.lname = maIdentity.currentUser.lastName;

	$scope.update = function () {
		var newUserData = {
			username: $scope.email,
			firstName: $scope.fname,
			lastName: $scope.lname
		};
		if ($scope.password && $scope.password.length > 0) {
			newUserData.password = $scope.password;
		};

		maAuth.updateCurrentUser(newUserData).then(function() {
			maNotifier.notify('Your user accout has been updated');
		}, function(reason) {
			maNotifier.error(reason);
		})
	};
})