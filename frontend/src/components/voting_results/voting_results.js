import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./voting_results.css";

class VotingResults extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      timer: 5
    };

    this.interval = 0;
    this.countdown = this.countdown.bind(this);
  }
  
  componentDidMount() {
    // Redirect in ten seconds.
    // setTimeout(()=>this.props.history.push("/"), 10000);
    this.interval = setInterval(this.countdown, 1000);
  }

  countdown() {
    this.setState({ timer: this.state.timer - 1});
    if (this.state.timer === 0) {
      clearInterval(this.interval);
      // Redirect in three seconds.
      this.props.history.push("/voting");
    }
  }

  render() {

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/">&times;</Link>
        </div>
        <h3 className="voting-results-timer">{this.state.timer}</h3>
        <div className="voting-results-container">
          {/* NOTE: we should change 'Results' to 'Round <x>', pass as prop from room */}
          <h1 className="voting-results-title">Results</h1>
          <ul className="voting-results-list">
            {
              this.props.ideas.map(idea => (
                <li key={`idea${idea._id}`} className='voting-results-idea'>{idea.body}</li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(VotingResults);
