import React from "react";
import { Link } from "react-router-dom";

class Room extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div>
        <h1>Welcome, {this.props.currentUser.name}. You are in the room.</h1>
        <Link to='/room/submitideas'>Start</Link>
      </div>
    );
  }
}

export default Room;
