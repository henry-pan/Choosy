const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const passport = require("passport");

const http = require('http');
const server = http.createServer(app);

const io = (module.exports.io = require("socket.io")(server));
const socket = require("./src/socket_backend");


// Set up routes
const users = require('./routes/api/users');
const ideas = require('./routes/api/ideas');
const rooms = require('./routes/api/rooms');
const guests = require('./routes/api/guests');


// HTTPS redirect
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && (req.headers['x-forwarded-proto'] !== 'https')) {
    res.redirect('https://' + req.headers.host + req.url);
  } else {
    next();
  }
});


// heroku
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


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
app.use("/api/rooms", rooms);
app.use("/api/ideas", ideas);
app.use("/api/guests", guests);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
