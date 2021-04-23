const io = require("../app").io;
const Room = require("./classes/room");
const User = require("./classes/user");

let ROOM_LIST = {};
let USER_LIST = {};

module.exports = function (socket) {
  socket.on("joinRoom", data => {
    socket.id = Math.random(); // change to room code?
    console.log(data.roomId);
    if (data.type === "createRoom") {
      room = ROOM_LIST[data.roomId] = new Room(data.roomId, socket.id); // todo: match params
    } else {
      room = ROOM_LIST[data.roomId];
    }
    let user;
    if (room) { // good
      user = room.addUser(socket.id, socket, data.userTag, data.roomId); // good
    } else socket.emit("nullRoomError");

    USER_LIST[socket.id] = user;
  });

  socket.on("userInput", data => {
    user = USER_LIST[socket.id];
  });

  socket.on("disconnect", () => {
    if (!USER_LIST[socket.id]) {
      return null;
    }
    let roomId = USER_LIST[socket.id].roomId;
    let room = ROOM_LIST[roomId];
    if (socket.id) {
      room.removeUser(socket.id);
      delete USER_LIST[socket.id];
      if (Object.keys(room.users).length === 0) {
        delete ROOM_LIST[roomId];
      }
    }
  });

  socket.on("startRoom", data => {
    console.log("Starting room");
    ROOM_LIST[data.roomId].startRoom();
  });
};