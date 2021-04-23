const io = require("../app").io;

// https://www.youtube.com/watch?v=NwHq1-FkQpU
let users = []; // this is a collection ?!?

const othernames = [];


io
  .on('connection', (socket) => {
    socket.on('joins server', (username) => {
        const user = {
          username,
          id: socket.id
        };
        users.push(user);
        io.emit('user list update', users); // emits array of user objects to the client
      })
    socket.on('join room', (roomName, cb) => { //client will pass in a roomname (the code)
      // callback is for getting the other usernames of people in the room already to the user who just emitted the event.
      //
      socket.join(roomName);
      cb(othernames[roomName]); 
      // socket.emit("joined", othernames[roomName]); // less preferred because it requires setting up another listener on the frontend
    })
    socket.on('submit username', ({username, to, roomcode }) => { //to is the socket id
      // to is "a chat name or an individual socket id"
      const payload = {
        username,
        roomcode
      };
      socket.to(to).emit("new username", payload);
      if (othernames[roomCode]) {
        othernames[roomCode].push({
          username
        })
      }
    })
    socket.on("disconnect", () => {
      users = users.filter(u => u.id !== socket.id);
      io.emit("user list update", users);
    })
  }
);



// *********** TO TEST ****************
// Does calling io.on('connection') create multiple sockets? Answer: NO


// // https://socket.io/docs/v4/rooms/
// // creates room?
// io.on('connection', (socket) => {
//   io.of("/room").adapter.on("create-room", (room) => {
//     console.log(`room ${room} was created`);
//   });
// });

// borrowing from routes, simple .join method
// create room
// io.of("/room").on('connection', (socket) => {

//   socket.on('create room', (room) => {
//     console.log(room);
//     room.code = (Math.random() * 9876543210).toString().slice(0, 6);
//     socket.join(room);
//   })

// });


// // https://socket.io/docs/v4/rooms/
// // join room?
// io.on('connection'), (socket) => {
//   io.of("/").adapter.on("join-room", (room, id) => {
//     console.log(`socket ${id} has joined room ${room}`);
//     // io.to(`${RANDOM_CODE}`).emit() // put something in emit so that it emits the username of the current signed-in user
//   });
// }

// // https://socket.io/docs/v4/rooms/
// //join room?
// io.of("/room").on('connection'), (room, id) => {
//     console.log(`socket ${id} has joined room ${room}`);
//     // io.to(`${RANDOM_CODE}`).emit() // put something in emit so that it emits the username of the current signed-in user
// }

// // https://www.youtube.com/watch?v=bxUlKDgpbWs 
// //join room?
// io
//     .of("/room")
//     .on('connection'), (socket) => {
//         socket.on("joinRoom", (room) => {
//           socket.join(room);
//         });
// }
