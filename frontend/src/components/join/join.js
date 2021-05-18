import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./join.css"

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasNick: false,
      nick: (this.props.currentUser ? this.props.currentUser.name : "")
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
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
        <h1 className="title join-username-title">{this.props.roomCode || "999999"}</h1>
        <p className="join-username-blurb">Enter a nickname to join this room!</p>
        <form id="form-test" className="join-username-form" onSubmit={this.handleSubmit}>
          <input id="input-test" className="join-username-input" placeholder="Your nickname" value={this.state.nick} onChange={this.handleInput} autoComplete="off" />
          <button className="link-btn join-username-btn">Join</button>
        </form>
      </div>
      </>
    );
  }
}

export default Join;
