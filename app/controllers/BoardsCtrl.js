app.controller("BoardsCtrl", 
  ["$scope",
   "$firebaseArray",
   "Auth",
   "Logout",
   "$location",
  function($scope, $firebaseArray, Auth, Logout, $location) {

    // Logout
    $scope.logout = function(){
      Logout();
      console.log("logged out");
      $location.path("#/login");
    };

    //This will connect to firebase and get the info
    var ref = new Firebase("https://pinterest-app.firebaseio.com/boards");
    // download the data into a local object
    $scope.boards = $firebaseArray(ref);

    $scope.userBoards = [];

    $scope.boards.$watch(function() {
      $scope.userBoards = $scope.boards.filter(function(board){
        return board.uid === Auth.$getAuth().uid;
      });
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
        uid: Auth.$getAuth().uid,
        imgage: $scope.newBoard.image
      });
      $scope.newBoard = {"":""};
    };

    //modal popup

   $scope.modalShown = false;

    $scope.toggleModal = function() {
    console.log("click");
    $scope.modalShown = !$scope.modalShown;
  };

}]);