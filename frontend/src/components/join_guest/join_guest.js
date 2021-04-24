import React from "react";
import "./join_guest.css";
import { withRouter } from "react-router-dom";

class JoinGuest extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillUnmount(){
    this.props.history.push("/room");
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const guest = Object.assign({}, this.state);

    // todo: test to make sure this posts to guest document in the backend
    this.props.joinAsGuest(guest);
    
    console.log("Entering the room: ", this.props.roomCode, "with user: ", this.state.username);

    this.props.closeModal();
  }

  renderErrors(){
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }


  render() {
    return (
      <>
        <h1>{this.props.roomCode}</h1>
        <form id="form" className="splash-join-room" onSubmit={this.handleSubmit}>
          <input id="input" className="join-guest-input" onChange={this.handleInput("username")} type="text" value={this.state.username} placeholder="Enter a username"/>
          {this.renderErrors()}
          <button className="link-btn join-guest-btn">Join</button>
        </form>
      </>
    );
  }
}

export default withRouter(JoinGuest);
