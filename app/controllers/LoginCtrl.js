app.controller("LoginCtrl", 
  ["currentAuth", 
  "$scope", 
  "Auth", 
  "$location",
  "Logout",
  function(currentAuth, $scope, Auth, $location, Logout) {

    // Logout
    $scope.logout = function(){
      Logout();
      console.log("logged out");
    };

  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if(authData !== null){
        console.log(authData.auth.uid);
      } else {
        console.log('User not currently logged in');
      }
    });

    $scope.redirect = function(){
      $location.path("#/home");
    };



    var ref = new Firebase("https://pinterest-app.firebaseio.com");
    var authData = ref.getAuth();
    console.log("authData: ", authData);
    //if no login, authenticate with facebook OAuth
    if(authData === null) {
      ref.authWithOAuthPopup("facebook", function(error, authData) { //1.firebase sends request for request token to github with client id and secret id
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $location.path("#/boards");
        }
      });
    }

}]);