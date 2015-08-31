app.controller("SingleBoardCtrl", 
  ["$scope",
   "$firebaseArray",
   "store-uid",
   "$routeParams",
  function($scope, $firebaseArray, storeUid, $routeParams) {

    //This will connect to firebase and get the info
    var ref = new Firebase("https://pinterest-app.firebaseio.com/boards");
    // download the data into a local object
    $scope.boards = $firebaseArray(ref);

    $scope.selectedBoard = {};
    $scope.boardId = $routeParams.id;
    console.log("Scope.songId = ", $scope.boardId);

    $scope.boards.$loaded()
      .then(function(boards) { 
       $scope.selectedBoard = boards.filter(function(board){
          return board.$id === $scope.boardId;
        })[0];   
      });

}]);