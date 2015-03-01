angular.module('app').factory('maIdentity', function(){
	return {
		currentUser: undefined,
		isAuthenticated: function () {
			return !!this.currentUser;
		}
	};
})