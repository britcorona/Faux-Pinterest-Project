app.factory("GetUrl", function($q, $http) {
  function getWebsite(url) {
    return $q(function(resolve, reject) {
      $http.get(url)
      .success(
        function(data) {
        resolve(data);
      },function(error) {
        reject(error);
      });
    });
  }
  return getWebsite();
});