const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const passport = require("passport");

const http = require('http');
const server = http.createServer(app);

// https://socket.io/docs/v4/rooms/
// const { Server } = require("socket.io");
// const io = new Server(server);

// https://www.youtube.com/watch?v=NwHq1-FkQpU
// doesn't work with the other files

// const io = socket(server);
// const socket = require("socket.io");


// https://github.com/OmarMAbbasi/StarfighterPvP/blob/master/app.js
const io = (module.exports.io = require("socket.io")(server));


// const SocketUtil = require("./src/socket_server_util");
// const SocketTest = require("./src/socket_testing");
const SocketDraft = require("./src/socket_draft");


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
  console.log(socket.id); // why are there different sockets sometimes?
  console.log('a user connected'); // why are there so many of these sometimes?
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

