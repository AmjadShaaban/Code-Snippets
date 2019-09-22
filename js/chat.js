$(document).ready(function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCszCiGMtbfQW3xaAstweYKbib82r0WZF0",
    authDomain: "simple-chat-app-5aaa9.firebaseapp.com",
    databaseURL: "https://simple-chat-app-5aaa9.firebaseio.com",
    projectId: "simple-chat-app-5aaa9",
    storageBucket: "",
    messagingSenderId: "556619862197",
    appId: "1:556619862197:web:bbf2cefddac59566122efc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  // reference to firebase JSON tree
  var messagesRef = database.ref();

  // cache DOM references
  var messageField = $("#messageInput"),
    nameField = $("#nameInput"),
    messageList = $("#messages"),
    onlineList = $("#online-users");

  // press event ENTER key
  messageField.keypress(function(e) {
    if (e.keyCode == 13) {
      var username = nameField.val();
      var message = messageField.val();

      //register data to firebase
      messagesRef.push({ name: username, text: message });
      messageField.val("");
    }
  });

  // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(10).on("child_added", function(snapshot) {
    //get data
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    //only if username and message = true then display username,message
    if (username && message) {
      //create element message and sanitize text
      var text = "says";
      var messageElement = $("<li>");
      var nameElement = $("<strong class='name'></strong>");
      nameElement.text(username.concat(" " + text + " "));
      messageElement.text(message).prepend(nameElement);

      //add message
      messageList.append(messageElement);

      //scroll to bottom in messages
      messageList[0].scrollTop = messageList[0].scrollHeight;
    }
  });

  var listRef = database.ref("presence");
  var userRef = listRef.push();

  // Add ourselves to presence list when online
  var presenceRef = database.ref("connected");
  presenceRef.on("value", function(snap) {
    if (snap.val()) {
      userRef.set(true);
      // Remove ourselves when we disconnect
      userRef.onDisconnect().remove();
    }
  });

  // Number of online users is the number of objects in the presence list.
  listRef.on("value", function(snap) {
    //display number of online users in online-users
    onlineList.text(snap.numChildren());
  });
});
