//Since this is a controller must list the ref for firebase everytime
app.controller("PinCtrl", 
  ["$scope",
   "$firebaseArray",
   "Auth",
   "Logout",
   "$location",
  function($scope, $firebaseArray, Auth, Logout, $location) {

  	//This will connect to firebase and get the info
	  var ref = new Firebase("https://pinterest-app.firebaseio.com/addpin");
	  // download the data into a local object
	  $scope.pins = $firebaseArray(ref);

    // Logout
    $scope.logout = function(){
      Logout();
      console.log("logged out");
      $location.path("#/login");
    };
    
	  //Add Pin
		$scope.addPin = function() {
			console.log(storeUid.getUid());
			$scope.pins.$add({
				pin_name: $scope.newPin.pin_name,
				description: $scope.newPin.description,
				image: $scope.newPin.image,
				origUrl: $scope.newPin.origUrl,
        uid: Auth.$getAuth().uid
			});
			$scope.newPin = {"":""};
		};


    $scope.hoverPin = false;
    $scope.hoverDeletePin = false;

    $scope.hoverIn = function(){
      //console.log("hey");
      $scope.hoverPin = true;
      $scope.hoverDeletePin = true;
    };
    $scope.hoverOut = function(){
        //console.log("ho");
      $scope.hoverPin = false;
      $scope.hoverDeletePin = false;
    };

     $scope.modalShown = false;
  $scope.toggleModal = function() {
    console.log("click");
    $scope.modalShown = !$scope.modalShown;
  };

}]);