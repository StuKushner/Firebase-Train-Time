 // Configuration to Firebase
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

  // Use Firebase to populate data
  // Click on submit button
  $("#submit").click(function(){
  	event.preventDefault();

    // Grabs user input
  	var trainName = $("#train-name").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrainTime = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
  	var frequency = $("#frequency").val().trim();

    var result = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(firstTrainTime);
    console.log(result);

    // Holds train data
    var newTrain = {
      name: trainName,
      place: destination,
      first: firstTrainTime,
      frequency: frequency
    };

    // Uploads new train data to database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.place);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    // Alert
    alert("New Train Added");

    // Clear all input boxed
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");

  });
 
// Create firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // Stores everything into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrainTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    // Logs information to console
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Get the time of the first train and log it 
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    // Calculate the current time and log it
    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    // Get the difference between the first train time and the current time and log it
    var timeDifference = moment().diff((firstTrainTimeConverted));
    console.log(timeDifference);

    // Get the time remainder and use it to figure out when the next train is coming. 
    // Append the table as such. Log everything.
    var timeRemainder = timeDifference % frequency;
    console.log(timeRemainder);

    var minutesTillNextTrain = frequency - timeRemainder;
    console.log(minutesTillNextTrain);

    var nextArrivingTrain = moment().add(minutesTillNextTrain, "minutes").format("HH:mm");
    console.log(moment(nextArrivingTrain).format("HH:mm"));

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
      frequency + "</td><td>" + moment(firstTrainTimeConverted).format("HH:mm") + "</td><td>" + minutesTillNextTrain + "</td></tr>");

  });
