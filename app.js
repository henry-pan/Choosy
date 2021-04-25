const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const passport = require("passport");

const http = require('http');
const server = http.createServer(app);

const io = (module.exports.io = require("socket.io")(server));


// const SocketUtil = require("./src/socket_server_util");
// const SocketTest = require("./src/socket_testing");
const SocketDraft = require("./src/socket_draft");


// Set up routes
const users = require('./routes/api/users');
const ideas = require('./routes/api/ideas');
const rooms = require('./routes/api/rooms');
const guests = require('./routes/api/guests');

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


//displays routes in console log (testing only)
// function print (path, layer) {
//   if (layer.route) {
//     layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
//   } else if (layer.name === 'router' && layer.handle.stack) {
//     layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
//   } else if (layer.method) {
//     console.log('%s /%s',
//       layer.method.toUpperCase(),
//       path.concat(split(layer.regexp)).filter(Boolean).join('/'))
//   }
// }

// function split (thing) {
//   if (typeof thing === 'string') {
//     return thing.split('/')
//   } else if (thing.fast_slash) {
//     return ''
//   } else {
//     var match = thing.toString()
//       .replace('\\/?', '')
//       .replace('(?=\\/|$)', '$')
//       .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
//     return match
//       ? match[1].replace(/\\(.)/g, '$1').split('/')
//       : '<complex:' + thing.toString() + '>'
//   }
// }

// app._router.stack.forEach(print.bind(null, []))