import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./join.css"

class Join extends React.Component {

  render() {

    return (
      <>
      <div className="modal-header">
        <span className="modal-icon" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></span>
      </div>
      <div className="modal-content">
        <h1 className="title">{roomCode}</h1>
        <form id="form-test" className="join-username-form">
          <input id="input-test" className="join-username-input" placeholder="Your name" value={this.state.nick} onChange={this.handleInput} autoComplete="off" />
          <button className="link-btn join-username-btn">Join</button>
        </form>
      </div>
      </>
    );
  }
}

export default Join;
