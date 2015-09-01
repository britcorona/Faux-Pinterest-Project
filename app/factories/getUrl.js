app.factory("getUrl", function($q, $http) {
  function getCreatedPins() {
    return $q(function(resolve, reject) {
      $http.get('http://crossorigin.me/http://www.space.com/30429-starshade-alien-life-search-wfirst-tech.html')
      .success(
        function(objectFromJSONFile) {
        resolve(objectFromJSONFile);
      },function(error) {
        reject(error);
      });
    });
  }
  return getCreatedPins();
});