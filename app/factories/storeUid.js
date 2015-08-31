app.factory("store-uid", function() {
  // This facory is used to set and store the user id so that it can be easily
  // accessed when saving and retreiving data

  var uid = '';

  return {
    getUid: function() {
      return uid;
    },
    setUid: function(setUid) {
      uid = setUid;
    }
  };

});