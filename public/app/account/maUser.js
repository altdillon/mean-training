angular.module('app').factory('maUser', function($resource){
	var UserResource = $resource('/api/users/:id', {_id:"@id"}, {
		update: {
			method:'PUT',
			isArray:false
		}
	});

	UserResource.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin') > -1;
	};

	return UserResource;
})