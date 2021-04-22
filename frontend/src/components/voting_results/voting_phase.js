import React from "react";
import { Link, withRouter } from "react-router-dom";

class VotingResults extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    // Redirect in ten seconds.
    setTimeout(()=>this.props.history.push("/"), 10000);
  }

  handleVote(vote) {
    this.setState({ vote: vote, voted: true });
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
        <button onClick={() => this.handleVote(0)} className="link-btn voting-btn">👎</button>
        <button onClick={() => this.handleVote(1)} className="link-btn voting-btn">👍</button>
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

export default withRouter(VotingResults);
