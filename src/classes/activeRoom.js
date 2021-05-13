const io = require("../../app").io;

class ActiveRoom {
  constructor(code) {
    // add other room properties later
    this.code = code;
    this.usernames = [];
  }

  addSocket(socket) {
    socket.join('room ' + this.code);
  }

  emit(...data) {
    io.to('room ' + this.code).emit(...data);
  }

  emitUsernames(){
    this.emit('load usernames', this.usernames);
  }
}

module.exports = ActiveRoom;