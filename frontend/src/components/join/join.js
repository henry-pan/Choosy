import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./join.css"

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasNick: false,
      nick: (this.props.currentUser.name === "Guest" ? "" : this.props.currentUser.name)
    };
  }

  submitNick(){
    this.setState({ hasNick: true });
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
        <h1 className="title">{this.props.roomCode}</h1>
        <form id="form-test" className="join-username-form" onSubmit={this.submitNick}>
          <input id="input-test" className="join-username-input" placeholder="Your name" value={this.state.nick} onChange={this.handleInput} autoComplete="off" />
          <button className="link-btn join-username-btn">Join</button>
        </form>
      </div>
      </>
    );
  }
}

export default Join;
