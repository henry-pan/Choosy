const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const passport = require("passport");
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const SocketUtil = require("./src/socket_server_util");


// Set up routes
const users = require('./routes/api/users');
const ideas = require('./routes/api/ideas');
const rooms = require('./routes/api/rooms');
const guests = require('./routes/api/guests');


// Comment in for heroku
// const path = require('path');
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/build'));
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   })
// }


//Configure mongoose to connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  

// Configure app to use passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Express 4.16+ methods to replace body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Configure routes
app.use("/api/users", users);
app.use("/api/ideas", ideas);
app.use("/api/rooms", rooms);
app.use("/api/guests", guests);

// ********** WORKS *************

//test socket connection/disconnection (remove in production)
io.on('connection', (socket) => {
  console.log('a user connected');
  // console.log(socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// emits the username
io.on('connection', (socket) => {
  // console.log(socket.id);
  socket.on('user joins room', (username) => {
    io.emit('user joins room', username);
    //save to the database here?
  });
});

// *********** TO TEST ****************
// Does calling io.on('connection') create multiple sockets? Answer: NO


// // https://socket.io/docs/v4/rooms/
// // creates room?
io.on('connection', (socket) => {
  io.of("/room").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
  });
});

// // borrowing from routes, simple .join method
// // create room?
// io.of("/room").on('connection', (socket) => {
//   const RANDOM_CODE = (Math.random() * 9876543210).toString().slice(0, 6);
//   socket.join(`${RANDOM_CODE}`);
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






const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

