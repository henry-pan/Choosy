import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Redirect }
import SocketClass from "../../util/socket_class";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./join.css"

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: (this.props.currentUser ? this.props.currentUser.name : "")
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
    const socket = new SocketClass(this.props.roomCode);
    const form = document.getElementById('join-form-modal');
    const input = document.getElementById('join-input-modal');
    // const start = document.getElementById('start-button');
    socket.submitUsername(form, input);
    // socket.startButton(start);
    socket.loadUsernames();
    // socket.startPhases(this.handleRoomStart);
    // socket.error();
    // socket.joinRoom();
  }

  handleSubmit(e){
    console.log(this.props.res);
    e.preventDefault();
    this.props.addGuest()
    .then(() => this.sendRoom(this.props.res));
  }

  sendRoom(res) {
    this.props.history.push(`/room/${res.roomId.data._id}`);
  }

  handleInput(e) {
    this.setState({ nick: e.target.value });
  }

  render() {

    return (
      <>
      <div className="modal-header">
        <span className="modal-icon" onClick={this.props.closeModal}><FontAwesomeIcon icon={faTimes} /></span>
      </div>
      <div className="modal-content">
        <h1 className="title join-username-title">{this.props.roomCode || "999999"}</h1>
        <p className="join-username-blurb">Enter a nickname to join this room!</p>
        <form id="join-form-modal" className="join-username-form" onSubmit={this.handleSubmit}>
          <input id="join-input-modal" className="join-username-input" placeholder="Your nickname" value={this.state.nick} onChange={this.handleInput} autoComplete="off" />
          <button className="link-btn join-username-btn">Join</button>
        </form>
      </div>
      </>
    );
  }
}

export default withRouter(Join);
