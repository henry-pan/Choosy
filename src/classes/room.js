class Room {
  constructor(id, host, code, ideas, guests, createdAt) {
    
    this.id = id;
    this.host = host;
    this.code = code;
    this.ideas = ideas;
    this.guests = guests;
    this.createdAt = createdAt;

    this.started = false;


    this.users = {};
    this.userSockets = {}; 
    // do I even want to keep track of user sockets in this class? Aren't the user sockets client side anyway? Why not just handle 
    // what I want is to have different sockets for different rooms. As far as I can tell this does not yet happen.
  }


  startRoom() {
    if (this.started) {
      return;
    }

    // emit to each userSocket a "start" event?

    this.started = true;
  }



}

module.exports = Room;