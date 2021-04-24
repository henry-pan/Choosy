const io = require("../app").io;


// emits the username
io
  .on('connection', (socket) => {
    socket
      // .to("room1")
      .on('user joins room', (username) => {
        io.emit('user joins room', username);
      })
  })
  .on('connection', (socket) => {
    socket.on('submit username', (username) => {
      io.emit('submit username', username);
    })
  });
