import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./voting_results.css";

class VotingResults extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      blurb: (this.props.ideas.length === 0 ? "Returning to submissions in ": "Voting starts in ")
    };

    this.interval = 0;
  }

  render() {
    let ideaList = this.props.ideas.map(idea => (
        <li key={`idea${idea._id}`} className="voting-results-item">
          <span className="voting-results-votes">{idea.__v}</span>
          <span className="voting-results-idea">{idea.body}</span>
        </li>
      ));

    let ideaContainer;
    if (this.props.ideas.length === 0) {
      ideaContainer = (<div className="voting-no-ideas"><p>No one submitted ideas!</p><p>Let's try that again!</p></div>);
    } else {
      ideaContainer = (<ul className="voting-results-list">{ideaList}</ul>);
    }

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="voting-results-container">
          <div className="title-container">
            <h1 className="title">Round {this.props.round}</h1>
            <h2 className="title-blurb">{this.state.blurb}{this.props.timer}</h2>
          </div>
          {ideaContainer}
        </div>
      </div>
    );
  }
}

export default VotingResults;
