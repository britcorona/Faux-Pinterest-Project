app.factory("PinIt", function() {
  // This facory is used to set and store the user id so that it can be easily
  // accessed when saving and retreiving data

  var pinId;

  return {
    getPinId: function() {
      return pinId;
    },
    setPinId: function(newPin) {
      pinId = newPin;
    }
  };

});