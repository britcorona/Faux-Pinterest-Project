app.controller("SingleBoardCtrl", 
  ["$scope",
   "$firebaseArray",
   "Auth",
   "$routeParams",
   "Logout",
   "$location",
  function($scope, $firebaseArray, Auth, $routeParams, Logout, $location) {

    // Logout
    $scope.logout = function(){
      Logout();
      console.log("logged out");
      $location.path("#/login");
    };

    //This will connect to firebase and get the info
    var boardsRef = new Firebase("https://pinterest-app.firebaseio.com/boards");
    // download the data into a local object
    $scope.boards = $firebaseArray(boardsRef);

    // variables to hold the selected board and id
    $scope.selectedBoard = {};
    $scope.boardId = $routeParams.id;
    console.log("Scope.boardId = ", $scope.boardId);

    // Function that finds the selected board
    $scope.boards.$loaded()
      .then(function(boards) { 
       $scope.selectedBoard = boards.filter(function(board){
          return board.$id === $scope.boardId;
        })[0];   
      });


    //This will connect to firebase and get the info
    var pinsRef = new Firebase("https://pinterest-app.firebaseio.com/addpin");
    // download the data into a local object
    $scope.pins = $firebaseArray(pinsRef);

    $scope.boardPins = [];

    $scope.pins.$loaded()
      .then(function(pins) { 
        console.log("all pins", $scope.pins);
       $scope.boardPins = pins.filter(function(pin){
          return pin.board_id === $scope.boardId;
        });
        console.log("board pins", $scope.boardPins);   
      });

    //Add Pin
    $scope.addPin = function() {
      console.log(Auth.$getAuth().uid);
      $scope.pins.$add({
        pin_name: $scope.newPin.pin_name,
        board_id: $scope.boardId, 
        description: $scope.newPin.description,
        image: $scope.newPin.image,
        origUrl: $scope.newPin.origUrl,
        uid: Auth.$getAuth().uid
      });
      $scope.newPin = {"":""};
    };

    $scope.pinFormVisible = false;
    $scope.showAddForm = function(){
      if($scope.pinFormVisible){
        $scope.pinFormVisible = false;
      } else {
        $scope.pinFormVisible = true;
      }
    };

}]);