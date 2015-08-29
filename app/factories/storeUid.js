app.factory("store-uid", function() {
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