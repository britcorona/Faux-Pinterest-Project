
var app = angular.module("PinApp", ['ngRoute', 'firebase']);

app.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'partials/addPin.html',
			controller: 'PinCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});

	}]);
