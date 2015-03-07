angular.module('app').controller('maUserListCtrl', function($scope, maUser){
	$scope.users = maUser.query();
})