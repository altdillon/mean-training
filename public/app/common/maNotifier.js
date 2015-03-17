angular.module('app').value('maToastr', toastr);

angular.module('app').factory('maNotifier', ['maToastr', function(maToastr){
	return {
		notify: function (msg) {
			maToastr.success(msg);
			console.log(msg);
		},
		error: function (msg) {
			maToastr.error(msg);
			console.log(msg);
		}
	}
}]);