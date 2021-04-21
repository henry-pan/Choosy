const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const passport = require("passport");
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);


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

//test socket connection/disconnection (remove in production)
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// if a 'user joins room' event fires, io will emit the username
io.on('connection', (socket) => {
  socket.on('user joins room', (username) => {
    io.emit('user joins room', username); // name is reserved so I can't use it
    //save to the database here
  });
});




app.get("/", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

