const io = require("../app").io;

// NOTE: to debug, write on the frontend browser console: 
// localStorage.debug = 'socket.io-client:socket'


let usernames = [];

io
  .on('connection', (socket) => {

    socket.emit('load usernames', usernames);

    // if we saved the names in the room somehow, we may be able to use something like below to get them from the database, similar to an express route:
    // Room.find({}, (err, usernames) => {
    //   if (err) throw err;
    //   console.log('sending previous messages');
    //   socket.emit('load usernames', usernames);
    // })
    

    // socket.on("connect_error", (err) => {
    //   console.log(`connect_error due to ${err.message}`);
    // });

    // emits the username
    socket.on('submit username', (username) => {
      io.emit('submit username', username);
      console.log(username);
      console.log(usernames.concat(username));
      usernames = usernames.concat(username);
      console.log(usernames);
    });

  });


io.on('disconnect', () => {
  usernames = [];
});