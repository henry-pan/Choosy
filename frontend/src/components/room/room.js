import React from "react";
import io from "socket.io-client";
import { socket } from "../../util/socket_util";
import { Link } from "react-router-dom";
import voting_phase from "../voting_phase/voting_phase";
import IdeaSubmissionContainer from "../idea_submission/idea_submission_container";
import VotingResultsContainer from "../voting_results/voting_results_container";
import VotingPhaseContainer from "../voting_phase/voting_phase_container";
import VotingWinnerContainer from "../voting_winner/voting_winner_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./room.css";


class Room extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      hasNick: false,
      phase: "room",
      round: 1,
      winner: false,
      timer: 15,
      ideas: this.props.userIdeas,
      idea_num: 0,
      survivors: []
    };
    this.interval = 0;
    this.countdown = this.countdown.bind(this);
    this.handleRoomStart = this.handleRoomStart.bind(this);
    this.newScoreIdeas = this.newScoreIdeas.bind(this);
    this.submitNick = this.submitNick.bind(this);
  }

  handleRoomStart() {
    this.props.fetchUserIdeas(this.props.currentUser.id);
    this.setState({ ideas: this.props.userIdeas, phase: "idea-submission" });
    this.interval = setInterval(this.countdown, 1000);
  }

  componentDidMount(){
    this.props.fetchRoom(this.props.match.params._id)
    .then(
      this.setState({
        roomId: (this.props.match.params._id)
      })
    ).then(console.log(this.props.match.params._id))
    // this.props.loadGuests(); // doesn't work

    socket();
  }


  newScoreIdeas() {
    let winner = false;
    let sortArr = this.state.ideas.sort((idea1, idea2) => idea1.__v - idea2.__v);
    //arr w/out 0's
    let noLosers = sortArr.filter(idea => idea.__v > 0);
    if (noLosers.length > 0) {
      sortArr = noLosers;
      for (let i = 0; i < this.state.ideas.length; i++) {
        if (this.state.ideas[i].__v === 0) {
          this.props.destroyIdea(this.state.ideas[i]._id);
        }
      }
    }
    if (sortArr.length <= 3) {winner = true}
    let deleteIndex = Math.floor(sortArr.length / 2);
    for (let i = 0; i < deleteIndex; i++) {
      this.props.destroyIdea(sortArr[i]._id)
    }
    let survivors = sortArr.slice(deleteIndex, sortArr.length)
    this.setState({ survivors: survivors })
    return winner;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countdown() {
    this.setState({ timer: this.state.timer - 1 })
    if (this.state.timer === 0) {
      switch (this.state.phase) {
        case "idea-submission": //moves to results
          this.props.fetchUserIdeas(this.props.currentUser.id);
          console.log("this.props, pre-results: ", this.props)
          this.setState({ phase: "results", timer: 13, ideas: this.props.userIdeas });

          break;
        case "results": //moves to voting
          this.interval = setInterval(this.countdown, 1000);
          this.setState({
            phase: "voting",
            timer: 13,
            round: this.state.round + 1,
            idea_num: 0
           });


          break;
        case "voting": //moves to either results or winner or more voting
          // if the idea number is the number of ideas, check for winner
          if (this.state.idea_num >= this.state.ideas.length - 1) {
            let winner = this.newScoreIdeas();
            //if there is a winner go to "winner", else go to "results"
            if (winner) {
              clearInterval(this.interval);
              this.setState({ phase: "winner" });
              this.setState({ ideas: this.state.survivors });
            } else {
              this.setState({ phase: "results", timer: 13 });
              this.setState({ ideas: this.state.survivors });
              console.log("this.props after voting", this.props)
            }
            //if the idea number is less than the num of ideas, reset voting
          } else {
            clearInterval(this.interval);
            this.setState({
              phase: "voting",
              idea_num: this.state.idea_num + 1,
              timer: 13
            })
          }
          break;
      }
    }
  }

  submitNick(){
    this.setState({
      hasNick: true
    })
  }

  room() {
    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <h1 className="title room-code">{this.props.room.code}</h1>
        <h2 className="room-subtitle">Room Code</h2>
        <ul id="usernames" className="room-users-container">
          {/* <span className="room-user-item">{this.props.currentUser.name}</span> */}
        </ul>
        
        {this.state.hasNick ? null : <form id="form-test" className="room-username-form" onSubmit={this.submitNick}>
          <input id="input-test" className="room-username-input" placeholder="Your name" autoComplete="off" />
          <button className="link-btn room-username-btn">Join</button>
        </form>}
        
        <p className="room-blurb">Click Start when everyone has joined to begin the submissions phase!</p>
        <button className="link-btn" onClick={this.handleRoomStart}>Start</button>
      </div>
    );
  }

  resetIdeas() {
    this.setState({
      ideaList: []
    })
  }

  render() {
    if (!this.props.currentUser) return null;
    switch (this.state.phase) {
      case "room":
        return this.room()
      case "idea-submission":
        return <IdeaSubmissionContainer timer={this.state.timer}/>
      case "results":
        return <VotingResultsContainer round={this.state.round} timer={this.state.timer}/>
      case "voting":
        return <VotingPhaseContainer key={this.state.idea_num} idea={this.state.ideas[this.state.idea_num]} timer={this.state.timer}/>
      case "winner":
        // CHANGE TO WINNER WHEN WE HAVE WINNER PAGE
        return <VotingWinnerContainer idea={this.state.ideas[0]}/>
    }
  }
}

export default Room;