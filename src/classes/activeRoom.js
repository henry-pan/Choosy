const io = require("../../app").io;

class ActiveRoom {
  constructor(code) {
    // add other room properties later
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

  shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

  emitDummyUsernames(){
    const shuffled = shuffle(this.dummyUsernames);
    this.emit('demo load usernames', [...this.usernames, ...this.dummyUsernames]);
  }
}

module.exports = ActiveRoom;