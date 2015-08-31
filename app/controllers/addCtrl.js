//Since this is a controller must list the ref for firebase everytime
app.controller("PinCtrl", 
  ["$scope",
   "$firebaseArray",
  function($scope, $firebaseArray) {

  	//This will connect to firebase and get the info
	  var ref = new Firebase("https://pinterest-app.firebaseio.com/addpin");
	  // download the data into a local object
	  $scope.addpin = $firebaseArray(ref);

	  //Add Song
		$scope.addPin = function() {
			$scope.addpin.$add({
				pin_name: $scope.newPin.pin_name,
				board_id: $scope.newPin.board_id, 
				description: $scope.newPin.description,
				image: $scope.newPin.image,
				origUrl: $scope.newPin.origUrl,
				uid: $scope.newPin.uid
			});
			$scope.newPin = {"":""};
		};
}]);