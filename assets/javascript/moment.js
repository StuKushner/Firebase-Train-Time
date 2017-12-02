 var config = {
    apiKey: "AIzaSyA6rXTiiIUsPWjN5AhXF4HXKmuQnbGFsy8",
    authDomain: "train-time-4e9a4.firebaseapp.com",
    databaseURL: "https://train-time-4e9a4.firebaseio.com",
    projectId: "train-time-4e9a4",
    storageBucket: "train-time-4e9a4.appspot.com",
    messagingSenderId: "542462216947"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").click(function(){
  	event.preventDefault();

  	var trainName = $("#train-name").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrainTime = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
  	var frequency = $("#frequency").val().trim();

    var result = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(firstTrainTime);
    console.log(result);


    var newTrain = {
      name: trainName,
      place: destination,
      first: firstTrainTime,
      frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.place);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("New Train Added");

    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");

  });
 

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrainTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    var timeDifference = moment().diff((firstTrainTimeConverted));
    console.log(timeDifference);

    var timeRemainder = timeDifference % frequency;
    console.log(timeRemainder);

    var minutesTillNextTrain = frequency - timeRemainder;
    console.log(minutesTillNextTrain);

    var nextArrivingTrain = moment().add(minutesTillNextTrain, "minutes").format("HH:mm");
    console.log(moment(nextArrivingTrain).format("HH:mm"));

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
      frequency + "</td><td>" + moment(firstTrainTimeConverted).format("HH:mm") + "</td><td>" + minutesTillNextTrain + "</td></tr>");

  });
