app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://pinterest-app.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);