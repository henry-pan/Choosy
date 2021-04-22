import io from "socket.io-client";


// used in room.js.
export const handleUsername = () => {
  const socket = io();
  console.log("frontend handleUsername socket: ", socket); 
  // different ids (nested under flags) on the frontend
  const form = document.getElementById('form');
  const input = document.getElementById('input');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('user joins room', input.value);
      input.value = '';
    }
  });
}

export const addUsername = () => {
  const socket = io();
  console.log("frontend addUsername socket: ", socket); 
  // different ids (nested under flags) on the frontend
  const usernames = document.getElementById('usernames');

  socket.on('user joins room', function (username) {
    var item = document.createElement('li');
    item.textContent = username;
    usernames.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
}