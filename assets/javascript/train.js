// // Initialize Firebase

var config = {
  apiKey: "AIzaSyDKpYcSfzoLzrYWJt_Q9roOSg8y4f9fbj0",
  authDomain: "train-5bb56.firebaseapp.com",
  databaseURL: "https://train-5bb56.firebaseio.com",
  projectId: "train-5bb56",
  storageBucket: "",
  messagingSenderId: "554385305430"
};
//     // Create a variable to reference the database.
//     var database = firebase.database();
firebase.initializeApp(config);

var dataRef = firebase.database();

var train = "";
var destination = "";
var firstTime = "";
var nextTrain = "";
var frequency = "";
var tMinutesTillTrain = "";
var tRemainder = "";
    // Initial Values
     

    // Capture Button Click
    $("#button").on("click", function(event) {
        event.preventDefault();

        train = $("#train").val();
        destination = $("#destination").val();
        firstTime = $("#first-time").val();
        frequency = $("#frequency").val();

        dataRef.ref().push({

          train:  train,
          destination: destination,
          firstTime: firstTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      });
        // console.log(event);
        // console.log("button");
        
        dataRef.ref().on("child_added", function(childSnapshot) {

          // Log everything that's coming out of snapshot
          console.log(childSnapshot.val().train);
          console.log(childSnapshot.val().destination);
          console.log(childSnapshot.val().firstTime);
          console.log(childSnapshot.val().frequency);
          // console.log(childSnapshot.val().comment);
          // console.log(childSnapshot.val().joinDate);
    
          // full list of items to the well                                                                   where info populates to the list that stays
          $("#full-member-list").append("<tr class='member-train'><td> " +
            childSnapshot.val().train +
            " </td><td class='member-destination'> " + childSnapshot.val().destination +
            " </td><td class='member-frequency'> " + childSnapshot.val().frequency + 
            " </td><td class='member-firstTIme'> " +  moment(nextTrain).format("hh:mm") +
            "</td><td class= 'member-minutes'>" + moment(tRemainder).format("minutes") +"</td></tr>");
             
    
          // Handle the errors
        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        });

        dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
          // Change the HTML to reflect
          //frequency and first time 
          firstTime = snapshot.val().firstTime;
          console.log(firstTime);
          
          var currentTime = moment();
          console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
          
          frequency = snapshot.val().frequency;

          var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
          console.log(firstTimeConverted);
          
          // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
     tRemainder = diffTime % frequency;
     console.log(tRemainder);

//     // Minute Until Train
     tMinutesTillTrain = frequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
//variables have scope, scope means they live inside curly braces or global
//     // Next Train
     nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

          $("#train").text(snapshot.val().train);
          $("#destination").text(snapshot.val().destination);
//how is the number 16:00 getting on the screen
          $("#first-time").text(nextTrain);
          $("#frequency").text(snapshot.val().frequency);
        });

        //want arrival time to populate on html
        //2:51 now, frequncy = 2min, next train 





//          // Assume the following situations.



//     // (TEST 1)
//     // First Train of the Day is 3:00 AM
//     // Assume Train comes every 3 minutes.
//     // Assume the current time is 3:16 AM....
//     // What time would the next train be...? (Use your brain first)
//     // It would be 3:18 -- 2 minutes away

//     // (TEST 2)
//     // First Train of the Day is 3:00 AM
//     // Assume Train comes every 7 minutes.
//     // Assume the current time is 3:16 AM....
//     // What time would the next train be...? (Use your brain first)
//     // It would be 3:21 -- 5 minutes away


//     // ==========================================================

//     // Solved Mathematically
      // Test case 1:
      // 16 - 00 = 16
      // 16 % 3 = 1 (Modulus is the remainder)
      // 3 - 1 = 2 minutes away
      // 2 + 3:16 = 3:18

//     // Solved Mathematically
//     // Test case 2:
//     // 16 - 00 = 16
//     // 16 % 7 = 2 (Modulus is the remainder)
//     // 7 - 2 = 5 minutes away
//     // 5 + 3:16 = 3:21

//      Assumptions
//      var tFrequency = 3;

// //      Time is 3:30 AM
//      var firstTime = "03:30";

// //      First Time (pushed back 1 year to make sure it comes before current time)
    

// //      Current Time
//     var currentTime = moment();
//      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// //     // Difference between the times
//      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//      console.log("DIFFERENCE IN TIME: " + diffTime);

// //     // Time apart (remainder)
//      var tRemainder = diffTime % tFrequency;
//      console.log(tRemainder);

// //     // Minute Until Train
//      var tMinutesTillTrain = tFrequency - tRemainder;
//      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// //     // Next Train
//      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





       
   