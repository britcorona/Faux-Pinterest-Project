app.controller("homeCtrl", 
  ["$scope",
   "$firebaseArray",
   "Auth",
  function($scope, $firebaseArray, Auth) {
    $scope.name = Auth.$getAuth().facebook.displayName

    //This will connect to firebase and get the info
    var ref = new Firebase("https://pinterest-app.firebaseio.com/addpin");
    // download the data into a local object
    $scope.pins = $firebaseArray(ref);

    //Add Pin
    $scope.addPin = function() {
      $scope.pins.$add({
        pin_name: $scope.newPin.pin_name,
        //board_id: $scope.newPin.board_id, 
        description: $scope.newPin.description,
        image: $scope.newPin.image,
        origUrl: $scope.newPin.origUrl,
      });
      $scope.newPin = {"":""};
    };
  }]);

//current user id, filter by the user id, only display filtered pins