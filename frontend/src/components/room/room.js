import React from "react";
import io from "socket.io-client";
import { handleUsername, addUsername } from "../../util/socket_util";
import { Link } from "react-router-dom";

class Room extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount(){
    // this.props.loadGuests(); // doesn't work
    addUsername();
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div>
        <h1>Welcome, {this.props.currentUser.name}. You are in the room.</h1>
        <ul id="usernames"></ul>
        <form id="form" action="">
          <input id="input" placeholder="Input name" autoComplete="off" /><button>Send</button>
        </form>
        <Link to='/room/submitideas'>Start</Link>
      </div>
    );
  }
}

export default Room;
