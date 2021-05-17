import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./voting_phase.css";

class VotingPhase extends React.Component{
  constructor(props){
    super(props);

    this.voteBlurbs = ["What do you think of...", "Thoughts on...", "Hot or not...", "Perhaps..."];
    this.playerBlurbs = ["Good choice!", "An excellent decision.", "Nice."];
    this.appBlurbs = ["Don't worry, we chose for you.", "Tough decision? We've got you."];

    this.state = {
      timer: this.props.timer - 3,
      vote: 0,
      voted: false,
      blurb: this.voteBlurbs[Math.floor(Math.random() * this.voteBlurbs.length)],
      idea: this.props.idea
    };

    this.interval = 0;
    this.countdown = this.countdown.bind(this);
  }
  
  componentDidMount() {
    this.interval = setInterval(this.countdown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countdown() {
    this.setState({ timer: this.state.timer - 1});
    if (this.state.timer === 0) {
      clearInterval(this.interval);
      if (!this.state.voted) this.handleAppVote(Math.floor(Math.random() * 2));
    }
  }

  handlePlayerVote(vote) {
    this.setState({ vote: vote, voted: true, 
      blurb: this.playerBlurbs[Math.floor(Math.random() * this.playerBlurbs.length)] });
    this.processVote(vote);
  }

  handleAppVote(vote) {
    console.log("App voted", vote);
    this.setState({ vote: vote, voted: true,
      blurb: this.appBlurbs[Math.floor(Math.random() * this.appBlurbs.length)]
    });
    this.processVote(vote);
  }

  processVote(vote) {
    let idea = this.state.idea;
    if (vote === 1) this.props.updateIdea(idea);
  }

  render() {
    if (!this.props.currentUser) return null;
    let voteButtons;
    if (this.state.voted) {
      if (this.state.vote === 0) {
        voteButtons = <span className="voting-voted"><FontAwesomeIcon icon={faThumbsDown} /></span>;
      } else {
        voteButtons = <span className="voting-voted"><FontAwesomeIcon icon={faThumbsUp} /></span>;
      }
    } else {
      voteButtons = (<>
        <button onClick={() => this.handlePlayerVote(0)} className="link-btn voting-btn"><FontAwesomeIcon icon={faThumbsDown} /></button>
        <button onClick={() => this.handlePlayerVote(1)} className="link-btn voting-btn"><FontAwesomeIcon icon={faThumbsUp} /></button>
      </>);
    }

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="title-container">
          <h1 className="title">{(this.state.timer === 0 ? "Time's up!" : this.state.timer)}</h1>
          <h2 className="title-blurb">{this.state.blurb}</h2>
        </div>
        <div className="voting-idea-container">
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
