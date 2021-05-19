import React from "react";
import SocketClass from "../../util/socket_class";
import { Link } from "react-router-dom";
import IdeaSubmissionContainer from "../idea_submission/idea_submission_container";
import VotingResultsContainer from "../voting_results/voting_results_container";
import VotingPhaseContainer from "../voting_phase/voting_phase_container";
import VotingWinnerContainer from "../voting_winner/voting_winner_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./room.css";

const SUBMISSION_TIME = 10;
const RESULTS_TIME = 7;
const VOTING_TIME = 8; // TOTAL time, including countdown and after

class Room extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      showcase: true,
      showcaseUsers: ["Ben", "Henry", "Nat", "Tommy"],
      showcaseIdeas: ["Wendy's", "Micky D's", "Your Mom", "Taco Bell", "Pizza"],
      hasNick: false,
      phase: "room",
      round: 1,
      winner: false,
      timer: SUBMISSION_TIME,
      userIdeas: this.props.userIdeas,
      roomIdeas: this.props.roomIdeas,
      idea_num: 0,
      survivors: [],
      nick: (this.props.currentUser.name === "Guest" ? "" : this.props.currentUser.name)
    };
    this.interval = 0;
    this.countdown = this.countdown.bind(this);
    this.handleRoomStart = this.handleRoomStart.bind(this);
    this.newScoreIdeas = this.newScoreIdeas.bind(this);
    this.submitNick = this.submitNick.bind(this);
    this.getNextPhase  = this.getNextPhase.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleRoomStart() {
    // for figuring out which ideas were persisted. this can be helpful for debugging leaving in the middle of a phase.
    this.props.fetchUserIdeas(this.props.currentUser.id); 
    this.props.fetchRoomIdeas(this.props.room._id);
    const startedRoom = Object.assign({}, this.props.room);
    startedRoom.started = true;
    this.props.patchRoom(startedRoom);

    this.setState({ roomIdeas: this.props.roomIdeas, userIdeas: this.props.userIdeas, phase: "idea-submission" });
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
    )
    
    const socket = new SocketClass(this.props.room.code);
    socket.joinRoom();
    socket.error();
    if (this.props.currentUser.name !== "Guest" ){
      socket.addUsername(this.props.currentUser.name);
    }

    socket.startPhases(this.handleRoomStart);
    const start = document.getElementById('start-button');
    socket.startButton(start);
    socket.loadUsernames();
    
  }


  newScoreIdeas() {
    const roomIdeas = this.state.roomIdeas;

    let winner = false;
    let sortArr = roomIdeas.sort((idea1, idea2) => idea1.__v - idea2.__v);
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
    const roomIdeas = this.state.roomIdeas;

    switch (phase) {
      case "idea-submission": //moves to results
        this.props.fetchUserIdeas(this.props.currentUser.id); // why is it done this way? why not in the idea_submission_index.js file?
        this.props.fetchRoomIdeas(this.props.room._id);
        this.setState({ phase: "results", timer: RESULTS_TIME, userIdeas: this.props.userIdeas, roomIdeas: this.props.roomIdeas });
        break;
      case "results": //moves to voting
        this.props.fetchRoomIdeas(this.props.room._id);
        // send ideas to all users
        this.setState({ phase: "results", timer: RESULTS_TIME, userIdeas: this.props.userIdeas, roomIdeas: this.props.roomIdeas });
        clearInterval(this.interval);
        this.interval = setInterval(this.countdown, 1000);
        if (roomIdeas.length === 0) {
          this.setState({
            roomIdeas: this.props.roomIdeas,
            phase: "idea-submission",
            timer: SUBMISSION_TIME
          });
        } else {
          this.setState({
            phase: "voting",
            timer: VOTING_TIME,
            round: this.state.round + 1,
            idea_num: 0
          });
        }
        break;
      case "voting": //moves to either results or winner or more voting
        // if the idea number is the number of ideas, check for winner
        if (this.state.idea_num >= roomIdeas.length - 1) {
          this.props.fetchRoomIdeas(this.props.room._id);
          this.setState({ roomIdeas: this.props.roomIdeas });
          let winner = this.newScoreIdeas();
          //if there is a winner go to "winner", else go to "results"
          if (winner) {
            clearInterval(this.interval);
            // scores of remaining ideas should be reset here
            this.setState({ phase: "winner" });
          } else {
            this.setState({ phase: "results", timer: RESULTS_TIME });
          }
          this.setState({ roomIdeas: this.state.survivors });
          //if the idea number is less than the num of ideas, reset voting
        } else {
          clearInterval(this.interval);
          this.interval = setInterval(this.countdown, 1000);
          this.setState({
            phase: "voting",
            idea_num: this.state.idea_num + 1,
            timer: VOTING_TIME
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

  handleInput(e) {
    this.setState({ nick: e.target.value });
  }

  room() {
    let hostControls;
    if (this.props.room.host === this.props.currentUser.id) {
      hostControls = <>
      <p className="room-blurb">Click Start when everyone has joined to begin the submissions phase!</p>
      <button className="link-btn" id="start-button">Start</button>
      </>
    } else {
      hostControls = <p className="room-blurb">Waiting for the host to start...</p>
    }
    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <h1 className="title room-code">{this.props.room.code}</h1>
        <h2 className="room-subtitle">Room Code</h2>
        {/* {!this.state.showcase ? null : this.showcaseUsers()} */}
        <ul id="usernames" className="room-users-container">
        </ul>
        
        {/* {this.state.hasNick ? null : <form id="form-test" className="room-username-form" onSubmit={this.submitNick}>
          <input id="input-test" className="room-username-input" placeholder="Your name" value={this.state.nick} onChange={this.handleInput} autoComplete="off" />
          <button className="link-btn room-username-btn">Join</button>
        </form>} */}
        
        {hostControls}
      </div>
    );
  }

  showcaseIdeas() {
    //iterates through showcaseIdeas and adds them all
    console.log("showcase")
    if (this.state.showcaseIdeas.length > 0) {
      console.log(this.state.showcaseIdeas)
      this.state.showcaseIdeas.forEach(ideaName => {
        let currentIdea = { 
          roomId: this.props.room._id,
          user: this.props.currentUser,
          body: ideaName,
          score: 0
        }
        this.props.addIdea(currentIdea);
      })
      this.setState({ showcaseIdeas: [] })
    };
  }

  showcaseUsers() {
    return (
      <ul>
      {this.state.showcaseUsers.map(username => (
        <li className="room-user-item">{username}</li>
      ))}
      </ul>
    )
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
        if (this.state.showcase) this.showcaseIdeas();
        return <VotingResultsContainer round={this.state.round} timer={this.state.timer}/>
      case "voting":
        return <VotingPhaseContainer
          key={this.state.idea_num}
          idea={roomIdeas[this.state.idea_num]}
          timer={this.state.timer}
          showcaseIdeas={this.state.showcaseIdeas}/>
      case "winner":
        return <VotingWinnerContainer idea={roomIdeas[0]}/>
      default:
        break;
    }
  }
}

export default Room;
