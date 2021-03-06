import React from "react";
import SocketClass from "../../util/socket_util";
import { Link } from "react-router-dom";
import IdeaSubmissionContainer from "../idea_submission/idea_submission_container";
import VotingResultsContainer from "../voting_results/voting_results_container";
import VotingPhaseContainer from "../voting_phase/voting_phase_container";
import VotingWinnerContainer from "../voting_winner/voting_winner_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./room.css";

const SUBMISSION_TIME = 60;
const RESULTS_TIME = 7;
const VOTING_TIME = 8; // TOTAL time, including countdown and after

class Room extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      showcase: false,
      showcaseIdeas: ["McDonald's", "Gas Station Sushi", "Pho King", "Taco Bell", "Costco Pizza", "Chipotle", "In-N-Out Burger"],
      phase: "room",
      round: 1,
      winner: false,
      timer: SUBMISSION_TIME,
      userIdeas: this.props.userIdeas,
      roomIdeas: this.props.roomIdeas,
      idea_num: 0,
    };
    this.interval = 0;
    this.isHost = (this.props.room.host === this.props.currentUser.id);
    this.countdown = this.countdown.bind(this);
    this.handleRoomStart = this.handleRoomStart.bind(this);
    this.newScoreIdeas = this.newScoreIdeas.bind(this);
    this.getNextPhase  = this.getNextPhase.bind(this);
  }

  componentDidMount(){
    this.props.fetchRoom(this.props.match.params._id)
    .then(
      this.setState({ roomId: this.props.match.params._id })
    );
    
    const socket = new SocketClass(this.props.room.code);
    socket.error();
    if (this.props.location.state) {
      this.setState({ showcase: true });
      socket.joinShowcase();
      this.props.currentUser.name !== "Guest" ? socket.addUsername(this.props.currentUser.name) : socket.signedOutShowcaseUsername()
    } else {
      socket.joinRoom();
      if (this.props.currentUser.name !== "Guest") {
        socket.addUsername(this.props.currentUser.name);
      }
    }

    socket.startPhases(this.handleRoomStart);
    const start = document.getElementById('start-button');
    socket.startButton(start);
    socket.loadUsernames();
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }


  handleRoomStart() {
    // for figuring out which ideas were persisted. this can be helpful for debugging leaving in the middle of a phase.
    this.props.fetchUserIdeas(this.props.currentUser.id); 
    this.props.fetchRoomIdeas(this.props.room._id);
    const startedRoom = Object.assign({}, this.props.room);
    startedRoom.started = true;
    this.props.patchRoom(startedRoom);

    this.setState({ roomIdeas: this.props.roomIdeas, userIdeas: this.props.userIdeas, phase: "idea-submission" });
    this.interval = setInterval(this.countdown, 1000);
  }


  newScoreIdeas() {
    const roomIdeas = this.state.roomIdeas;
    let sortArr = roomIdeas.sort((idea1, idea2) => idea1.score - idea2.score);
    //arr w/out 0's
    let noLosers = sortArr.filter(idea => idea.score > 0);
    if (noLosers.length > 0) {
      sortArr = noLosers;
      for (let i = 0; i < roomIdeas.length; i++) {
        if (roomIdeas[i].score === 0 && this.isHost) {
          this.props.destroyIdea(roomIdeas[i]._id);
        }
      }
    }
    if (sortArr.length < 3) this.setState({ winner: true });

    let deleteIndex = Math.floor(sortArr.length / 2);
    for (let i = 0; i < deleteIndex; i++) {
      if (this.isHost) this.props.destroyIdea(sortArr[i]._id);
    }

    if (this.isHost) {
      this.props.fetchRoomIdeas(this.props.room._id)
      .then(res => {
        this.setState({ roomIdeas: res.ideas.data });
      });
    } else {
      setTimeout(()=>{
        this.props.fetchRoomIdeas(this.props.room._id)
        .then(res => {
          this.setState({ roomIdeas: res.ideas.data });
        })
      }, 500);
    }
  }


  getNextPhase(phase){
    const roomIdeas = this.state.roomIdeas;

    switch (phase) {
      case "idea-submission": //moves to results
        if (this.state.showcase) this.addShowcaseIdeas();
        setTimeout(() => {
          this.props.fetchUserIdeas(this.props.currentUser.id);
          this.props.fetchRoomIdeas(this.props.room._id);
        }, 500);

        setTimeout(() => {
          this.setState({ phase: "results", timer: RESULTS_TIME, userIdeas: this.props.userIdeas, roomIdeas: this.props.roomIdeas });
        }, 1300);
        break;
      case "results": //moves to voting
        this.props.fetchRoomIdeas(this.props.room._id)
        this.setState({ phase: "results", timer: RESULTS_TIME, userIdeas: this.props.userIdeas, roomIdeas: this.props.roomIdeas });

        clearInterval(this.interval);
        this.interval = setInterval(this.countdown, 1000);
        if (roomIdeas.length === 0) {
          this.setState({ phase: "idea-submission", timer: SUBMISSION_TIME, roomIdeas: this.props.roomIdeas });
        } else {
          this.setState({ phase: "voting", timer: VOTING_TIME, round: this.state.round + 1, idea_num: 0 });
        }
        break;
      case "voting": //moves to either results or winner or more voting
        // if the idea number is the number of ideas, check for winner
        if (this.state.idea_num >= roomIdeas.length - 1) {
          this.props.fetchRoomIdeas(this.props.room._id)
            .then(res => {
              this.setState({ roomIdeas: res.ideas.data });
              // if there is a winner go to "winner", else go to "results"
              if (this.state.winner) {
                clearInterval(this.interval);
                // scores of remaining ideas should be reset here
                this.setState({ phase: "winner" });
              } else {
                this.setState({ phase: "results", timer: RESULTS_TIME });
              }
              // if the idea number is less than the num of ideas, reset voting
            });
        } else {
          clearInterval(this.interval);
          this.interval = setInterval(this.countdown, 1000);
          this.setState({ phase: "voting", timer: VOTING_TIME, idea_num: this.state.idea_num + 1 });
        }
        break;
      default:
        break;
    }
  }


  countdown() {
    this.setState({ timer: this.state.timer - 1 });
    if (this.state.timer === 0) {
      this.getNextPhase(this.state.phase);
    }
    if ((this.state.timer === 2) && 
      (this.state.idea_num >= this.state.roomIdeas.length - 1) &&
      (this.state.phase === 'voting')) {
        this.props.fetchRoomIdeas(this.props.room._id)
          .then(res => {
            this.setState({ roomIdeas: res.ideas.data });
            this.newScoreIdeas();
          });
    }
  }


  addShowcaseIdeas() {
    this.state.showcaseIdeas.forEach(ideaName => {
      let currentIdea = { 
        roomId: this.props.room._id,
        user: this.props.currentUser,
        body: ideaName,
        score: 0
      };
      this.props.addIdea(currentIdea);
    });
  }


  resetIdeas() {
    this.setState({ ideaList: [] });
  }


  room() {
    let controlBlurb = "Click Start when everyone has joined to begin the submissions phase!";
    if (this.props.location.state && this.props.location.state.showcase) {
      controlBlurb = "You and four friends need to pick a restaurant to go to. Press Start and enter some restaurant ideas!"
    }

    let hostControls = <p className="room-blurb">Waiting for the host to start...</p>;
    if (this.isHost) {
      hostControls = <>
        <p className="room-blurb">{controlBlurb}</p>
        <button className="link-btn" id="start-button">Start</button>
      </>
    }

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <h1 className="title room-code">{this.props.room.code}</h1>
        <h2 className="room-subtitle">Room Code</h2>
        <ul id="usernames" className="room-users-container">
        </ul>
        {hostControls}
      </div>
    );
  }

  
  loading() {
    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <h1 className="title loading">Loading...</h1>
      </div>
    );
  }


  render() {
    const roomIdeas = this.state.roomIdeas.sort(
      (idea1, idea2) => Date.parse(idea1.date) - Date.parse(idea2.date)
    );

    if (!this.props.currentUser) return null;
    if (this.state.timer <= 0 && this.state.phase !== "winner") return this.loading();

    switch (this.state.phase) {
      case "room":
        return this.room();
      case "idea-submission":
        return <IdeaSubmissionContainer timer={this.state.timer} room={this.props.room._id}/>
      case "results":
        return <VotingResultsContainer round={this.state.round} timer={this.state.timer}/>
      case "voting":
        return <VotingPhaseContainer
          key={this.state.idea_num}
          idea={roomIdeas[this.state.idea_num]}
          timer={this.state.timer}
          showcaseIdeas={this.state.showcaseIdeas}
          showcase={this.state.showcase}/>
      case "winner":
        return <VotingWinnerContainer idea={roomIdeas[0]}/>
      default:
        break;
    }
  }
}

export default Room;
