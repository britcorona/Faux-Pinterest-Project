//Make sure to list firebase to make firebase work with the information in songsCtrl.js
var app = angular.module("PinApp", ['ngRoute', 'firebase', 'ui.bootstrap', 'PinApp.login'])

 .run(['$rootScope', 'Auth', function($rootScope, Auth) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
 }]);
