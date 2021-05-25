const io = require("../app").io;
const ActiveRoom = require("./classes/activeRoom");

// NOTE: to debug, write on the frontend browser console: 
// localStorage.debug = 'socket.io-client:socket'

const rooms = new Map();

io.on('connection', (socket) => {

  // emits the username
  socket.on('guest username', (username, code) => {
    const room = rooms.get(code);
    if (!room) {
      socket.emit('error', 'something went wrong with the guest username event');
      return;
    } 

    room.usernames.push(username);
    room.emitUsernames();
  });

  socket.on('add username', (username, code) => {
    const room = rooms.get(code);
    if (!room) {
      socket.emit('error', 'something went wrong with the add username event');
      return;
    }
    room.usernames.push(username);
    room.emitUsernames();
  })

  socket.on('join showcase', (code) => {
    let room = rooms.get(code);
    if (!room) {
      room = new ActiveRoom(code);
      rooms.set(code, room);
    }

    room.addSocket(socket);
    room.emitShowcaseUsernames();
  });

  // maps room codes to ActiveRoom instance
  socket.on('join room', (code) => {
    let room = rooms.get(code);
    if (!room) {
      room = new ActiveRoom(code);
      rooms.set(code, room);
    }

    //calls the addSocket method defined in the ActiveRoom class
    room.addSocket(socket);
    room.emitUsernames();
  });

  // starts the room
  socket.on('start button', (code) => {
    const room = rooms.get(code);
    if (!room) {
      socket.emit('error', 'something went wrong with the start room event');
      return;
    }

    room.startPhases();
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected');
  })
});


io.on('disconnect', () => {
  console.log('socket.io backend server disconnected');
});