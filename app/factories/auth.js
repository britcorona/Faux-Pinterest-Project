app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    // returns the firebase authenication object that we acces in our LoginCtrl
    var ref = new Firebase("https://pinterest-app.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);