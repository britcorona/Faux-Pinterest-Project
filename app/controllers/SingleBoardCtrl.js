app.controller("SingleBoardCtrl", 
  ["$scope",
   "$firebaseArray",
   "Auth",
   "$routeParams",
   "Logout",
   "$location",
   "getUrl",
  function($scope, $firebaseArray, Auth, $routeParams, Logout, $location, getUrl) {



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
    // console.log("Scope.boardId = ", $scope.boardId);

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
    // console.log("$scope.pins", $scope.pins);

    $scope.boardPins = [];



    $scope.pins.$watch(function(){
      $scope.boardPins = [];
      for(var i = 0; i < $scope.pins.length; i++){
        if($scope.pins[i].board_id.indexOf($scope.boardId) !== -1){
          $scope.boardPins.push($scope.pins[i]);
        }
      }
      // console.log("board Pins", $scope.boardPins);
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

  // get URL function
  $scope.getTheUrl = function(){
        $scope.newPin = {};
    $scope.newPin.pin_name = '';
    $scope.newPin.description = '';
    $scope.newPin.image = '';

    $scope.newPin.origUrl = $("#userUrl").val();
    getUrl($scope.newPin.origUrl)
    .then(function(data){
      // console.log("data dump", data);
      $("#userUrl").val('');

      var titleStart = data.indexOf("<title>");

      if(titleStart !== -1) {
        var titleFinish = data.indexOf("</title>");
        $scope.newPin.pin_name = (data.substring(titleStart + 7, titleFinish));
      }

      var descriptionStart = data.indexOf("<meta property='og:description' content='");

      if (descriptionStart === -1) {
        descriptionStart = data.indexOf("<meta property='og:description' content='");
      }
      
      if (descriptionStart === -1) {
        descriptionStart = data.indexOf('<meta property="og:description" content="');
      }

      descriptionStart += 7;

      if (descriptionStart !== 6) {
        var descriptionOn = data.substring(descriptionStart);
        var descriptionend = descriptionOn.indexOf('>');
        $scope.newPin.description = data.substring(descriptionStart + 34, descriptionStart + descriptionend);
      }

      var imgStart = data.indexOf("<meta itemprop='thumbnailUrl' property='article:thumbnailUrl' content='");
      if (imgStart !== -1) {
        imgStart += 71;
      }
      if (imgStart === -1) {
        imgStart = data.indexOf('<meta property="og:image" content="') + 35;
      }

      if (imgStart !== -1) {
        var imgSubString = data.substring(imgStart);
        var imgEnd = imgSubString.indexOf(">");
        if (imgSubString.charAt(imgEnd -1) === "/"){
          imgEnd -=1;
        }
        var thumb = data.substring(imgStart, imgStart + imgEnd -1);
        console.log("thumb", thumb);

        $scope.newPin.image = thumb;
      }

    });
  };
    



}]);