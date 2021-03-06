const io = require("../../app").io;

class ActiveRoom {
  constructor(code) {
    this.code = code;
    this.usernames = [];
    this.showcaseUsernames = ['Ben', 'Henry', 'Nat', 'Tommy'];
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

  emitShowcaseUsernames(){
    this.usernames.push(...this.showcaseUsernames);
    this.emit('load usernames', this.showcaseUsernames);
  }

  startPhases(){
    this.emit('start phases');
    this.started = true;
  }

}

module.exports = ActiveRoom;
