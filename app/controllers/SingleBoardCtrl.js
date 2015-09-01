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
    console.log("$scope.pins", $scope.pins);

    $scope.boardPins = [];



    $scope.pins.$watch(function(){
      $scope.boardPins = [];
      for(var i = 0; i < $scope.pins.length; i++){
        if($scope.pins[i].board_id.indexOf($scope.boardId) !== -1){
          $scope.boardPins.push($scope.pins[i]);
        }
      }
      console.log("board Pins", $scope.boardPins);
    });

    //Add Pin
    $scope.addPin = function() {
      console.log(Auth.$getAuth().uid);
      $scope.pins.$add({
        pin_name: $scope.newPin.pin_name,
        board_id: [$scope.boardId], 
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


       //modal popup

   $scope.modalShown = false;

    $scope.toggleModal = function() {
    console.log("click");
    $scope.modalShown = !$scope.modalShown;
  };


}]);