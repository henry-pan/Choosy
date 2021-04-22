const User = require("./user");
const Idea = require("./idea");

class Room {
  constructor(
    roomId,
    hostId,
    roomCode,
    date,
    ideas,
    users,
    guests
  ) {

    this.started = false;

    // initialize constants
    this.roomId = roomId;
    this.roomCode = roomCode;
    this.date = date;
    this.ideas = ideas;
    
    
    
    // I'm still uncertain about how I want to handle combining users and guests
    this.users = users;
    this.users = {};
    this.userSockets = {};
    this.guests = guests;
    this.hostId = hostId;

    this.timer = 0;
  }

  async startRoom() {
    if (this.started) {
      return;
    }

    Object.values(this.userSockets).forEach(socket => {
      console.log(`Emitting to ${socket.id}`);
      socket.emit("roomStart");
    });

    this.started = true;

    this.roomOver();
  }

  emitFullIdeaList() {
    Object.values(this.userSockets).forEach(socket => {
      // emit ideas
      socket.emit("ideaList", {
        ideas: Object.values(this.ideas).map(idea => ({
          id: idea.id,
          user: idea.user,
          body: idea.body,
          score: idea.score,
          date: idea.date
        }))
      });
    });
  }

  // **FUNCTIONS TO HANDLE THE ROOM LOGIC**

  roomOver() { }

  addUser(userId, socket, userTag, roomId) {

    // confused about what this line is doing
    this.userSockets[userId] = socket;

    if (userTag === 'Demo') this.demo = true;
    if (userTag === 'LoggedIn') {}; // do something
    if (userTag === 'Guest') {}; // do something
    if (userTag === 'Host') {}; // do something

    let user = new User(
      // pass in relevant user params
    );
    user.userTag = userTag;
    user.roomId = roomId;
    this.users[userId] = user;
    this.userSockets[userId] = socket;

    Object.values(this.userSockets).forEach(socket => {
      socket.emit("userJoin", {
        users: Object.values(this.users).map(user => ({
          id: user.id,
          name: user.name,
          ideas: user.ideas,
          userTag: user.userTag
        }))
      });
    });

    return user;
  }

  removeUser(userId) {
    delete this.users[userId];
    delete this.userSockets[userId];
  }
}

module.exports = Room;