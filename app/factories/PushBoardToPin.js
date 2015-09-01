app.factory("PushBoardToPin", function($firebaseArray) {
  // This facory is used to set and store the user id so that it can be easily
  // accessed when saving and retreiving data

 //This will connect to firebase and get the info
    var ref = new Firebase("https://pinterest-app.firebaseio.com/addpin");
    // download the data into a local object
    var pins = $firebaseArray(ref);

  return function(pin, boardId) {
    console.log("pin in push to board function:", pin);
    console.log("board in push to board function:", boardId);


    // Need to set up logic the prevents duplicate pins on the same board

    var indexOfpin = pins.$indexFor(pin);

    console.log("indexOfpin", indexOfpin);

    // var originalBoard = pins[indexOfpin].board_id;

    pins[indexOfpin].board_id[pins[indexOfpin].board_id.length] = boardId;

    console.log("pins[indexOfpin]",pins[indexOfpin]);

    pins.$save(indexOfpin).then(function(ref) {
      console.log("ref", ref);
    });

  };

});