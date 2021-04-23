import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./voting_results.css";

class VotingResults extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    // Redirect in ten seconds.
    setTimeout(()=>this.props.history.push("/"), 10000);
  }

  render() {

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="voting-results-container">
          <h1 className="voting-results-title">Results</h1>
          <ul className="voting-results-list">
            <li className="voting-results-item">an earth-shattering idea</li>
            <li className="voting-results-item">an amazing idea</li>
            <li className="voting-results-item">a great idea</li>
            <li className="voting-results-item">a decent idea</li>
            <li className="voting-results-item">a tolerable idea</li>
            <li className="voting-results-item">a bad idea</li>
            <li className="voting-results-item">an abhorrent idea</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(VotingResults);
