import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./voting_phase.css";

class VotingPhase extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      timer: 10,
      vote: 0,
      voted: false,
      idea: this.props.idea
    };

    this.interval = 0;
    this.countdown = this.countdown.bind(this);
  }
  
  componentDidMount() {
    this.interval = setInterval(this.countdown, 1000);
  }

  countdown() {
    this.setState({ timer: this.state.timer - 1});
    if (this.state.timer === 0) {
      clearInterval(this.interval);
      if (!this.state.voted) {
        this.setState({ vote: Math.floor(Math.random() * 2), voted: true });
      }
      // Redirect in three seconds.
      // setTimeout(()=>this.props.history.push("/"), 3000);
    }
  }

  handleVote(vote) {
    this.setState({ vote: vote, voted: true });
    if (vote === 1) {
      this.state.idea.__v = this.state.idea.__v + 1
      this.props.updateIdea(this.state.idea)
    }
  }

  render() {
    if (!this.props.currentUser) return null;
    // if (!this.props.idea) return null;
    let voteButtons;
    if (this.state.voted) {
      if (this.state.vote === 0) {
        voteButtons = <span className="voting-voted"><FontAwesomeIcon icon={faThumbsDown} /></span>;
      } else {
        voteButtons = <span className="voting-voted"><FontAwesomeIcon icon={faThumbsUp} /></span>;
      }
    } else {
      voteButtons = (<>
        <button onClick={() => this.handleVote(0)} className="link-btn voting-btn"><FontAwesomeIcon icon={faThumbsDown} /></button>
        <button onClick={() => this.handleVote(1)} className="link-btn voting-btn"><FontAwesomeIcon icon={faThumbsUp} /></button>
      </>);
    }
    
    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <span className="voting-timer">{this.state.timer}</span>
        <div className="voting-idea-container">
          {/* CHANGE TO THIS.PROPS.IDEA */}
          <span className="voting-idea">{this.props.idea.body}</span>
        </div>
        <div className="voting-vote-container">
          {voteButtons}
        </div>
      </div>
    );
  }
}

export default VotingPhase;
