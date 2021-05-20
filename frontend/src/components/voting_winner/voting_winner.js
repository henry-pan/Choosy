import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./voting_winner.css";

class VotingWinner extends React.Component {
  constructor(props){
    super(props);

    this.winnerBlurbs = ["One idea stood above all, and it was...",
    "Everyone liked...", "Congratulations to...", "We have a winner...",
    "This is it! The winning idea is...", "The popular, the triumphant..."];

    this.state = {
      blurb: this.winnerBlurbs[Math.floor(Math.random() * this.winnerBlurbs.length)]
    }
  }

  handleRegister() {
    this.props.logout();
    this.props.history.push("/register");
  }

  render() {
    let registerBlurb = (<>
      <p className="voting-winner-blurb">Liked Choosy? Create an account to host your own rooms!</p>
      <button className="link-btn" onClick={()=>this.handleRegister()}>Register</button>
    </>);

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="voting-winner-container">
          <div className="title-container">
            <h1 className="title">Winner</h1>
            <h2 className="title-blurb">{this.state.blurb}</h2>
          </div>
          <h1 className="voting-winner-item">{this.props.idea.body}</h1>
          <p className="voting-winner-blurb">Thank you for choosing Choosy!</p>
          {(this.props.currentUser.name === "Guest") && registerBlurb}
        </div>
      </div>
    );
  }
}

export default withRouter(VotingWinner);
