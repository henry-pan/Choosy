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
  // .of("/room").adapter.on("create-room", (room) => {
  //   console.log(`room ${room} was created`);
  // })
  .on('connection', (socket) => {
    socket.on('submit username', (username) => {
      io.emit('submit username', username);
    })
  });
