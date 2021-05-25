const io = require("../../app").io;

class ActiveRoom {
  constructor(code) {
    this.code = code;
    this.usernames = [];
    this.showcaseUsernames = ['DemoUser', 'Ben', 'Henry', 'Nat', 'Sou'];
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

    this.emit('load usernames', this.usernames);
  }

  startPhases(){
    this.emit('start phases');
    this.started = true;
  }

}

module.exports = ActiveRoom;