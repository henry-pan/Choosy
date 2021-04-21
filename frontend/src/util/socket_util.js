import io from "socket.io-client";

export const handleUsername = () => {
  const socket = io();

  const usernames = document.getElementById('usernames');
  const form = document.getElementById('form');
  const input = document.getElementById('input');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('user joins room', input.value);
      input.value = '';
    }
  });

  socket.on('user joins room', function (username) {
    var item = document.createElement('li');
    item.textContent = username;
    usernames.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
}