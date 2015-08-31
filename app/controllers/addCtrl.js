//Since this is a controller must list the ref for firebase everytime
app.controller("PinCtrl", 
  ["$scope",
   "$firebaseArray",
  function($scope, $firebaseArray) {

  	//This will connect to firebase and get the info
	  var ref = new Firebase("https://pinterest-app.firebaseio.com/addpin");
	  // download the data into a local object
	  $scope.songs = $firebaseArray(ref);

	  //Add Song
		$scope.addPin = function() {
			$scope.songs.$add({
				pin_name: $scope.newPin.pin_name,
				board_type: $scope.newPin.board_type, 
				description: $scope.newPin.description,
				image: $scope.newPin.image
			});
		};

    $scope.hoverPin = false;

    $scope.hoverIn = function(){
      console.log("hey");
      $scope.hoverPin = true;
    };
    $scope.hoverOut = function(){
        console.log("ho");
      $scope.hoverPin = false;
    };

}]);