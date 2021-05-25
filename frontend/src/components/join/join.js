import React from 'react';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClientSocket from "../../util/socket_util";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./join.css"

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
    const socket = new ClientSocket(this.props.roomCode);
    const form = document.getElementById('join-form-modal');
    const input = document.getElementById('join-input-modal');
    input.focus();
    socket.guestUsername(form, input);
    socket.error();
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.addGuest()
    .then(() => this.sendRoom(this.props.res))
    .then(() => this.props.closeModal());
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
