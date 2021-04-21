import React from "react";
import io from "socket.io-client";
import { handleUsername } from "../../util/socket_util"

class Room extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount(){
    // this.handleUsername();
    handleUsername();
  }

  handleUsername(){
    const socket = io();

    const usernames = document.getElementById('usernames');
    const form = document.getElementById('form');
    const input = document.getElementById('input');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('user joins room', input.value);
        input.value = '';
      }
    });

    socket.on('user joins room', function (username) {
      var item = document.createElement('li');
      item.textContent = username;
      usernames.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div>
        <h1>Welcome, {this.props.currentUser.name}. You are in the room.</h1>
        <ul id="usernames"></ul>
        <form id="form" action="">
          <input id="input" placeholder="Input name" autocomplete="off" /><button>Send</button>
        </form>
      </div>
    );
  }
}

export default Room;
