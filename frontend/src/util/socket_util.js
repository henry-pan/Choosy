import io from "socket.io-client";

export const socket = (roomCode, handleRoomStart) => {

  let socketURL = "127.0.0.1:5000";
  if (process.env.NODE_ENV === "production") {
    socketURL =
      process.env.REACT_APP_SOCKET_URL || "https://choosyapp.herokuapp.com/";
  }
  let socket = io(socketURL, { transports: ["websocket"] });

  // submit name form
  const form = document.getElementById('form-test');
  const input = document.getElementById('input-test');
  const start = document.getElementById('start-button');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('submit username', input.value, roomCode);
      input.value = '';
    }
  });

  if (start) {
    start.addEventListener('click', function (e) {
      e.preventDefault();
      socket.emit('start button', roomCode);
    });
  }

  socket.on('load usernames', (usernames) => {
    const usernamesEl = document.getElementById('usernames');
    usernamesEl.innerHTML = '';
    console.log(usernames);
    for (const username of usernames) {
      var item = document.createElement('li');
      item.textContent = username;
      item.classList.add('room-user-item');
      usernamesEl.appendChild(item);
    }
  });

  socket.on('start phases', () => {
    handleRoomStart();
    console.log("hi");
  });

  socket.on('error', (error) => {
    alert(error);
  });

  socket.emit('join room', roomCode);
}