import React from "react";
import { Link } from "react-router-dom";

class VotingPhase extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div className="content">
        <div className="auth-nav">
          <Link className="btn-circle" to="/">&times;</Link>
        </div>
        <div>Timer</div>
        <h1>Idea</h1>
        <div className="voting-vote-container">
          <button className="vote-btn">Downvote</button>
          <button className="vote-btn">Upvote</button>

        </div>
      </div>
    );
  }
}

export default VotingPhase;
