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

  shuffle(array){
    placeholderArray = array;
    newArray = [];
    while (placeholderArray.length > 0){

      Math.floor(Math.random()*placeholderArray.length+1);
      // splice at that index (removing element)
      // push the element to newArray
      // join parts of old array together, mutating array 
    }
    return newArray;
  }

  emitDummyUsernames(){
    const dummies = 
    this.emit('demo load usernames', [...this.usernames, ...this.dummyUsernames]);
  }
}

module.exports = ActiveRoom;