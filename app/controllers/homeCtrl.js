
app.controller("homeCtrl", 
  ["$scope",
   "$firebaseArray",
   "store-uid",
  function($scope, $firebaseArray, storeUid) {

    //This will connect to firebase and get the info
    var ref = new Firebase("https://pinterest-app.firebaseio.com/addpin");
    // download the data into a local object
    $scope.home = $firebaseArray(ref);

    //Show Pins
    $scope.showPin = function() {
      console.log('show pins', $scope.home);
      $scope.home.$add({
        title: $scope.newHome.title,
        description: $scope.newHome.description,
        category : $scope.newHome.category,
        uid: storeUid.getUid(),
        imgage: $scope.newHome.image
      });
      $scope.newHome = {"":""};
    };
}]);