app.controller("pinItCtrl", 
  ["$scope",
   "$firebaseArray",
   "store-uid",
  function($scope, $firebaseArray, storeUid) {


  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

}]);