import io from "socket.io-client";

class SocketClass {
  constructor(roomCode) {
    this.roomCode = roomCode;

    let socketURL = "localhost:5000";
    if (process.env.NODE_ENV === "production") {
      socketURL =
        process.env.REACT_APP_SOCKET_URL || "https://choosyapp.herokuapp.com/";
    }
    this.socket = io(socketURL, { transports: ["websocket"] });
  }

  guestUsername(form, input){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        this.socket.emit('guest username', input.value, this.roomCode);
        input.value = '';
      }
    });
  }

  addUsername(name){
      this.socket.emit('add username', name, this.roomCode);
  }

  startButton(start){
    if (start) {
      start.addEventListener('click', (e) => {
        e.preventDefault();
        this.socket.emit('start button', this.roomCode);
      });
    }
  }

  loadUsernames(){
    this.socket.on('load usernames', (usernames) => {
      const usernamesEl = document.getElementById('usernames');
      if (!usernamesEl) return;
      usernamesEl.innerHTML = '';
      for (const username of usernames) {
        var item = document.createElement('li');
        item.textContent = username;
        item.classList.add('room-user-item');
        usernamesEl.appendChild(item);
      }
    });
  }

  startPhases(handleRoomStart){
    this.socket.on('start phases', () => {
      handleRoomStart();
    });
  }

  error(){
    this.socket.on('error', (error) => {
      alert(error);
    });
  }

  joinRoom(){
    this.socket.emit('join room', this.roomCode);
  }
}

export default SocketClass;