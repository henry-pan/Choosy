const io = require("../app").io;


// emits the username
io
  .on('connection', (socket) => {
    socket.on('submit username', (username) => {
      io.emit('submit username', username);
    })
  });
