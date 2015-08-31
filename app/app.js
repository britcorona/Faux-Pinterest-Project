
var app = angular.module("PinApp", ['ngRoute', 'firebase']);

// This first part tells the app that auth is required, 
//if the user isn't logged in it redirects to the login page
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the login page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);

// This designates the view and controller based on the route
// The resolve bit is what prevents a user from seeing anything untill they 
// are logged in.  Note: I added routes that don't currently exist, 
// but I think eventually will?
app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when("/login", {
      controller: "LoginCtrl",
      templateUrl: "partials/login.html",
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$waitForAuth();
        }]
      }
    }).
    when('/boards', {
      templateUrl: 'partials/boards.html',
      controller: 'BoardsCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    when('/board/:id', {
      templateUrl: 'partials/singleBoard.html',
      controller: 'SingleBoardCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    when('/profile/:id', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    }).
    when('/addPin', {
			templateUrl: 'partials/addPin.html',
			controller: 'PinCtrl',
			resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
		}).
    otherwise({
      redirectTo: '/home'
    });
}]);
