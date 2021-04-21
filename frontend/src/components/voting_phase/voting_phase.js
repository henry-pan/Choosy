import React from "react";
import { Link } from "react-router-dom";
import "./voting_phase.css";

class VotingPhase extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      timer: 10,
      vote: 0,
      voted: false
    };

    this.interval = 0;

    this.countdown = this.countdown.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  
  componentDidMount() {
    this.interval = setInterval(this.countdown, 1000);
  }

  countdown() {
    console.log("hi")
    this.setState({ timer: this.state.timer - 1});
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  handleVote(e) {
    this.setState({ vote: this.state.vote + 1, voted: true });
    console.log(this.state);
  }

  render() {
    if (!this.props.currentUser) return null;

    let voteButtons;
    if (this.state.voted) {
      if (this.state.vote === 0) {
        voteButtons = <span className="voting-voted">👎</span>;
      } else {
        voteButtons = <span className="voting-voted">👍</span>;
      }
    } else {
      voteButtons = (<>
        <button className="link-btn voting-btn">👎</button>
        <button onClick={this.handleVote} className="link-btn voting-btn">👍</button>
      </>);
    }
    
    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/">&times;</Link>
        </div>
        <span className="voting-timer">{this.state.timer}</span>
        <div className="voting-idea-container">
          <span className="voting-idea">a great idea</span>
        </div>
        <div className="voting-vote-container">
          {voteButtons}
        </div>
      </div>
    );
  }
}

export default VotingPhase;
