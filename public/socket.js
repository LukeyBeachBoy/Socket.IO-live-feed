var socket = io(); //goes to server, asks if they have an IO server, and connects

var btn = $("#addUserButton");

//Emit events
btn.on("click", e => {
  e.preventDefault();
  var name = $("#userInput")[0].value;
  var age = $("#ageInput")[0].value;
    console.log(name);
    console.log(age);
  socket.emit("newUser", {
    name,
    age
  });
});

//Listen for events
socket.on("newUser", user => {
    console.log(user);
  $("#userList").append(
    '<li class="list-group-item user-block">' +
      '<div class="inline-flex">' +
      `<h5>Name:</h5>${user.name}` +
      "</div>" +
      '<div class="inline-flex">' +
      `<h5>Age:</h5>${user.age}` +
      "</div>" +
      "</li>"
  );
});
