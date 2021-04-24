import io from "socket.io-client";

export const socket = () => {
  const socket = io();

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

  socket.on('submit username', function (username) {
    var item = document.createElement('li');
    item.textContent = username;
    item.classList.add('room-user-item');
    usernames.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

}