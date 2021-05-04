import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./voting_results.css";

class VotingResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timer: 5
    };

    this.interval = 0;
  }

  render() {
    let ideaList;
    if (this.props.ideas.length === 0) {
      ideaList = <h3 className="ideas-please">Please Submit Ideas!</h3>
    } else {
      ideaList = <ul className="voting-results-list">
            {
              this.props.ideas.map(idea => (
                <li key={`idea${idea._id}`} className="voting-results-item">
                  <span className="voting-results-votes">{idea.__v}</span>
                  <span className="voting-results-idea">{idea.body}</span>
                </li>
              ))
            }
          </ul>
    }

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="voting-results-container">
          <h1 className="title">Round {this.props.round}</h1>
          <p>Voting starts in {this.props.timer}</p>
          {ideaList}
        </div>
      </div>
    );
  }
}

export default VotingResults;
