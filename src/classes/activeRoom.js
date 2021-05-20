const io = require("../../app").io;

class ActiveRoom {
  constructor(code) {
    this.code = code;
    this.usernames = [];
    this.dummyUsernames = ['ben', 'henry', 'nat', 'tommy'];
    this.started = false;
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

  startPhases(){
    this.emit('start phases');
    this.started = true;
  }

}

module.exports = ActiveRoom;