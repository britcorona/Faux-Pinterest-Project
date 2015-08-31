app.controller("PinDisplayCtrl", 
  ["$scope",
   "createPin-storage",
   "$q",
  function($scope, createPin_storage, $q) {

	createPin_storage.then(
    function(promiseResolutionData) {

      $scope.addpin = promiseResolutionData;
    },
    function(promiseRejectionError) {
      console.log("error", promiseRejectionError);
    });
  
}]);