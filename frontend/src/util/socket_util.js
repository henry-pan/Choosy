import io from "socket.io-client";

//should be used by the createRoom button on the splash page
// export const createRoom = () => {
//   const socket = io();
//   const link = document.getElementById('create-room');

//   console.log(link);

//   link.addEventListener('click', function(e) {
//     socket['code'] = 123456; // assign the code randomly here and emit it?
//     socket.emit('create room');
//     console.log('hi');
//     console.log(socket);
//   })
// }

// used in room.js to join a room and new usernames. if factoring parts into a different function, must pass socket object in the parameters.
// export const joinRoom = () => {
//   const socket = io();
//   console.log("frontend joinRoom socket: ", socket); 
//   // different ids (nested under flags) on the frontend
//   const form = document.getElementById('form');
//   const input = document.getElementById('input');

  // form.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   if (input.value) {
  //     socket.emit('user joins room', input.value);
      
  //     input.value = '';
  //   }
  // });
// }

// export const addUsername = () => {
//   const socket = io();
//   console.log("frontend addUsername socket: ", socket); 
//   // different ids (nested under flags) on the frontend
//   const usernames = document.getElementById('usernames');

//   socket.on('user joins room', function (username) {
//     var item = document.createElement('li');
//     item.textContent = username;
//     usernames.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
//   });
// }

export const socket = () => {
  const socket = io();

  
  

  // submit name form
  const form = document.getElementById('form-test');
  const input = document.getElementById('input-test');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('submit username', input.value); // app.js line 76
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