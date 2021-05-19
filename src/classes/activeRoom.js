const io = require("../../app").io;

class ActiveRoom {
  constructor(code) {
    this.code = code;
    this.usernames = [];
    this.dummyUsernames = ['ben', 'henry', 'nat', 'tommy'];
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