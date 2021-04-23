import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./voting_winner.css";

class VotingWinner extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let saveIdeasText = (this.props.loggedIn ? "Save them to reuse them later!" : "Create an account to save them to reuse later!");

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="voting-winner-container">
          <h1 className="title voting-winner-title">Winner</h1>
          <h1 className="voting-winner-item">an earth-shattering idea</h1>
          <p className="voting-winner-blurb">Liked this set of ideas? {saveIdeasText}</p>
          <button className="link-btn">{this.props.loggedIn ? "Save" : "Register"}</button>
        </div>
      </div>
    );
  }
}

export default withRouter(VotingWinner);
