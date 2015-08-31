app.factory("createPin-storage", function($q, $http) {
	function getCreatedPins() {
		return $q(function(resolve, reject) {
			$http.get('./data/add_create.json')
			.success(
				function(objectFromJSONFile) {
				resolve(objectFromJSONFile.songs);
			},function(error) {
				reject(error);
			});
    });
  }
  return getCreatedPins();
});