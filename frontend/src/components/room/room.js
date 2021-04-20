import React from "react";

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
      </div>
    );
  }
}

export default Room;
