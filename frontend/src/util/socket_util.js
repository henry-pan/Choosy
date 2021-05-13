import io from "socket.io-client";

export const socket = () => {

  let socketURL = "127.0.0.1:5000";
  if (process.env.NODE_ENV === "production") {
    socketURL =
      process.env.REACT_APP_SOCKET_URL || "http://choosyapp.herokuapp.com/";
  }
  let socket = io(socketURL, { transports: ["websocket"] });

  // submit name form
  const form = document.getElementById('form-test');
  const input = document.getElementById('input-test');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('submit username', input.value);
      input.value = '';
    }
  });

  //add username to list
  const usernames = document.getElementById('usernames');

  socket.on('load usernames', (usernamesArr) => {
    for (let i = 0; i < usernamesArr.length; i++) {
      var item = document.createElement('li');
      item.textContent = usernamesArr[i];
      item.classList.add('room-user-item');
      console.log(usernamesArr);
      usernames.appendChild(item);
    }
  });

  socket.on('submit username', function (username) {
    var item = document.createElement('li');
    item.textContent = username;
    item.classList.add('room-user-item');
    usernames.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
  });

}