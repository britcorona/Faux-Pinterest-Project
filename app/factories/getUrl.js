app.factory("getUrl", function($q, $http) {

  function getUrl(urlToGet) {
    return $q(function(resolve, reject) {

      console.log("get url function fired");

      if ($("#userUrl").val() !== undefined) {
        url = $("#userUrl").val();
      }

      $http.get('http://crossorigin.me/' + urlToGet)
      .success(
        function(data) {
        resolve(data);
      },function(error) {
        reject(error);
      });
    });
  }
  return getUrl;
});