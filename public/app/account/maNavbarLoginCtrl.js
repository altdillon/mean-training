angular.module('app').controller('maNavbarLoginCtrl', function($scope, $http) {
    $scope.signin = function (username, password) {
        $http.post('/login', {username:username, password:password}).then(function(response) {
            if(response.data.success) {
                console.log('Logged In!');
            } else {
                console.log('failed to Log in');
            }
        });
    }
});
