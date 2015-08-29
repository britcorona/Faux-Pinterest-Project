app.controller("MyAuthCtrl", ["$scope", "$firebaseAuth",
  function($scope, $firebaseAuth) {
    var ref = new Firebase("https://pinterest-app.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);

  $scope.authObj.$createUser({
    email: "my@email.com",
    password: "mypassword"
  }).then(function(userData) {
    console.log("User " + userData.uid + " created successfully!");

    return $scope.authObj.$authWithPassword({
      email: "my@email.com",
      password: "mypassword"
    });
  }).then(function(authData) {
    console.log("Logged in as:", authData.uid);
  }).catch(function(error) {
    console.error("Error: ", error);
  });

    $scope.authObj.$authWithPassword({
    email: "my@email.com",
    password: "mypassword"
  }).then(function(authData) {
    console.log("Logged in as:", authData.uid);
  }).catch(function(error) {
    console.error("Authentication failed:", error);
  });

  $scope.authObj.$onAuth(function(authData) {
  if (authData) {
    console.log("Logged in as:", authData.uid);
  } else {
    console.log("Logged out");
  }
  });

  $scope.authObj.$changePassword({
  email: "my@email.com",
  oldPassword: "mypassword",
  newPassword: "otherpassword"
}).then(function() {
  console.log("Password changed successfully!");
}).catch(function(error) {
  console.error("Error: ", error);
});

  $scope.authObj.$changeEmail({
    oldEmail: "my@email.com",
    newEmail: "other@email.com",
    password: "mypassword"
  }).then(function() {
    console.log("Email changed successfully!");
  }).catch(function(error) {
    console.error("Error: ", error);
  });

  $scope.authObj.$removeUser({
    email: "my@email.com",
    password: "mypassword"
  }).then(function() {
    console.log("User removed successfully!");
  }).catch(function(error) {
    console.error("Error: ", error);
  });

  $scope.authObj.$resetPassword({
    email: "my@email.com"
  }).then(function() {
    console.log("Password reset email sent successfully!");
  }).catch(function(error) {
    console.error("Error: ", error);
});

}]);