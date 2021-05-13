import React from "react";
import { socket } from "../../util/socket_util";
import { Link } from "react-router-dom";
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
      userIdeas: this.props.userIdeas,
      roomIdeas: this.props.roomIdeas,
      idea_num: 0,
      survivors: []
    };
    this.interval = 0;
    this.countdown = this.countdown.bind(this);
    this.handleRoomStart = this.handleRoomStart.bind(this);
    this.newScoreIdeas = this.newScoreIdeas.bind(this);
    this.submitNick = this.submitNick.bind(this);
    this.getNextPhase  = this.getNextPhase.bind(this);
  }

  handleRoomStart() {
    // for figuring out which ideas were persisted. this can be helpful for debugging leaving in the middle of a phase.
    this.props.fetchUserIdeas(this.props.currentUser.id); 
    // this.props.fetchRoomIdeas(this.props.room._id);

    this.setState({ userIdeas: this.props.userIdeas, phase: "idea-submission" });
    // this.setState({ ideas: this.props.roomIdeas, phase: "idea-submission" });
    // I don't think adding ideas from either the user's old ideas or the old room ideas is the best solution long-term -- do we even need to pre-populate?
    this.interval = setInterval(this.countdown, 1000);
  }

  componentDidMount(){
    this.props.fetchRoom(this.props.match.params._id)
    .then(
      this.setState({
        roomId: (this.props.match.params._id)
      })
    ).then(console.log(this.props.match.params._id));

    socket();
  }


  newScoreIdeas() {
    const roomIdeas = this.state.roomIdeas;

    let winner = false;
    let sortArr = roomIdeas.sort((idea1, idea2) => idea1.__v - idea2.__v); // this should be roomIdeas
    //arr w/out 0's
    let noLosers = sortArr.filter(idea => idea.__v > 0);
    if (noLosers.length > 0) {
      sortArr = noLosers;
      for (let i = 0; i < roomIdeas.length; i++) { // should be roomIdeas
        if (roomIdeas[i].__v === 0) {
          this.props.destroyIdea(roomIdeas[i]._id); // should be roomIdeas
        }
      }
    }
    if (sortArr.length < 3) {winner = true}
    let deleteIndex = Math.floor(sortArr.length / 2);
    for (let i = 0; i < deleteIndex; i++) {
      this.props.destroyIdea(sortArr[i]._id);
    }
    let survivors = sortArr.slice(deleteIndex, sortArr.length);
    this.setState({ survivors: survivors });
    return winner;
  }

  //separate sorted array into separate arrays by score
  //randomize arrays
  //concat arrays

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNextPhase(phase){
    // const userIdeas = this.state.userIdeas;
    const roomIdeas = this.state.roomIdeas;

    switch (phase) {
      case "idea-submission": //moves to results
        this.props.fetchUserIdeas(this.props.currentUser.id); // why is it done this way? why not in the idea_submission_index.js file?
        this.props.fetchRoomIdeas(this.props.room._id);
        this.setState({ phase: "results", timer: 10, userIdeas: this.props.userIdeas, roomIdeas: this.props.roomIdeas });
        break;
      case "results": //moves to voting
        this.props.fetchRoomIdeas(this.props.room._id);
        this.setState({ phase: "results", timer: 10, userIdeas: this.props.userIdeas, roomIdeas: this.props.roomIdeas });
        clearInterval(this.interval);
        this.interval = setInterval(this.countdown, 1000);
        if (roomIdeas.length === 0) {
          this.setState({
            roomIdeas: this.props.roomIdeas,
            phase: "idea-submission",
            timer: 15
          });
        } else {
          this.setState({
            phase: "voting",
            timer: 13,
            round: this.state.round + 1,
            idea_num: 0
          });
        }
        break;
      case "voting": //moves to either results or winner or more voting
        // if the idea number is the number of ideas, check for winner
        if (this.state.idea_num >= roomIdeas.length - 1) {
          let winner = this.newScoreIdeas();
          //if there is a winner go to "winner", else go to "results"
          if (winner) {
            clearInterval(this.interval);
            // scores of remaining ideas should be reset here
            this.setState({ phase: "winner" });
          } else {
            this.setState({ phase: "results", timer: 13 });
          }
          this.setState({ roomIdeas: this.state.survivors });
          //if the idea number is less than the num of ideas, reset voting
        } else {
          clearInterval(this.interval);
          this.interval = setInterval(this.countdown, 1000);
          this.setState({
            phase: "voting",
            idea_num: this.state.idea_num + 1,
            timer: 13
          });
        }
        break;
      default:
        break;
    }
  }

  //NOTE: when tweaking timer, remember to change local timer as well
  countdown() {
    this.setState({ timer: this.state.timer - 1 });
    if (this.state.timer === 0) {
      this.getNextPhase(this.state.phase);
    }
  }

  submitNick(){
    this.setState({
      hasNick: true
    });
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
    });
  }

  render() {
    // const roomIdeas = this.state.roomIdeas;
    const roomIdeas = this.state.roomIdeas.sort(
      (idea1, idea2) => Date.parse(idea1.date) - Date.parse(idea2.date)
    );

    if (!this.props.currentUser) return null;
    switch (this.state.phase) {
      case "room":
        return this.room();
      case "idea-submission":
        return <IdeaSubmissionContainer timer={this.state.timer} room={this.props.room._id}/>
      case "results":
        return <VotingResultsContainer round={this.state.round} timer={this.state.timer}/>
      case "voting":
        return <VotingPhaseContainer key={this.state.idea_num} idea={roomIdeas[this.state.idea_num]} timer={this.state.timer}/>
      case "winner":
        // CHANGE TO WINNER WHEN WE HAVE WINNER PAGE
        return <VotingWinnerContainer idea={roomIdeas[0]}/>
      default:
        break;
    }
  }
}

export default Room;
