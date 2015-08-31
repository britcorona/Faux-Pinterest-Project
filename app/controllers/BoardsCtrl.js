app.controller("BoardsCtrl", 
  ["$scope",
   "$firebaseArray",
   "store-uid",
  function($scope, $firebaseArray, storeUid) {

    //This will connect to firebase and get the info
    var ref = new Firebase("https://pinterest-app.firebaseio.com/boards");
    // download the data into a local object
    $scope.boards = $firebaseArray(ref);

    $scope.userBoards = [];
    $scope.boards.$loaded()
      .then(function(boards) { 
        console.log("all boards", $scope.boards);
       $scope.userBoards = boards.filter(function(board){
          return board.uid === storeUid.getUid();
        });
        console.log("board pins", $scope.userBoards);   
      });

    $scope.AddBoardsShown = false;
    $scope.showAddBoards = function() {
      if ($scope.AddBoardsShown) {
        $scope.AddBoardsShown = false;
      } else {
        $scope.AddBoardsShown = true;
      }
    };

    //Add Board
    $scope.addBoard = function() {
      console.log('add board clicked', $scope.boards);
      $scope.boards.$add({
        title: $scope.newBoard.title,
        description: $scope.newBoard.description,
        category : $scope.newBoard.category,
        uid: storeUid.getUid(),
        imgage: $scope.newBoard.image
      });
      $scope.newBoard = {"":""};
    };
}]);