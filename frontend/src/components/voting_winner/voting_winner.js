import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./voting_winner.css";

class VotingWinner extends React.Component {
  render() {
    let registerBlurb = (<>
      <p className="voting-winner-blurb">Liked Choosy? Create an account to host your own rooms!</p>
      <Link className="link-btn" to="/">Register</Link>
    </>);

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="voting-winner-container">
          <h1 className="title voting-winner-title">Winner</h1>
          <h1 className="voting-winner-item">{this.props.idea.body}</h1>
          <p className="voting-winner-blurb">Thank you for choosing Choosy!</p>
          
          {this.props.loggedIn && registerBlurb}
        </div>
      </div>
    );
  }
}

export default withRouter(VotingWinner);
