import React from "react";
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
  }

  handleRoomStart() {
    this.props.fetchUserIdeas(this.props.currentUser.id);
    this.setState({ ideas: this.props.userIdeas, phase: "idea-submission" });
    this.interval = setInterval(this.countdown, 1000);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.userIdeas.length !== this.props.userIdeas.length) {
  //     this.props.fetchUserIdeas(this.props.currentUser.id);
  //     this.setState({ ideas: this.props.userIdeas });
  //   }
  // }

  //create duplicate of ideas at start so we can clear state?

  // scoreIdeas() {
  //   //sets winner to true if only one idea remaining
  //   let winner = false;
  //   //array of idea scores, sorted by score
  //   let scoreArr = this.state.ideas.map(idea => idea.__v).sort();
  //   //array of idea scores, sans scores of 0
  //   let noLosers = scoreArr.filter(score => score > 0);
  //   //replaces score_arr with no_losers and deletes zeros,
  //   //unless no_losers is empty or every score is zeros
  //   if (noLosers.length > 0) {
  //     scoreArr = noLosers;
  //     for (let i = 0; i < array.length; i++) {
  //       if (this.state.ideas[i].__v === 0) {
  //         this.props.destroyIdea(this.state.ideas[i]._id);
  //         delete this.state.ideas[i]
  //       }
  //     }
  //   };
  //   //gets last item index that should be deleted
  //   let deleteIndex = Math.floor(scoreArr.length / 2);
  //   if (deleteIndex + 1 === scoreArr.length) {winner = true}
  //   //gets highest score of item to be deleted
  //   let lowScore = scoreArr[deleteIndex];
  //   //gets array of items eligible to be deleted
  //   let losers = this.state.ideas.filter(idea => (idea.__v <= lowScore) && (idea.__v > 0));
  //   //delete losers
  //   for (let i = 0; i <= deleteIndex; i++) {
  //     this.props.destroyIdea(losers[i]);
  //   }
  //   return winner;
  // }


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
    console.log("sortArr after 0's", sortArr)
    if (sortArr.length <= 3) {winner = true}
    let deleteIndex = Math.floor(sortArr.length / 2);
    for (let i = 0; i < deleteIndex; i++) {
      this.props.destroyIdea(sortArr[i]._id)
    }
    let survivors = sortArr.slice(deleteIndex, sortArr.length)
    console.log("state before survivors ", this.state.ideas)
    console.log("survivors ", survivors)
    this.setState({ survivors: survivors })
    return winner;
  }

  //arr.sort((el1, el2) => el1 - el2)

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countdown() {
    this.setState({ timer: this.state.timer - 1 })
    if (this.state.timer === 0) {
      switch (this.state.phase) {
        case "idea-submission": //moves to results
          this.props.fetchUserIdeas(this.props.currentUser.id);
          this.setState({ phase: "results", timer: 5, ideas: this.props.userIdeas });

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
            console.log("winner ", winner)
            //if there is a winner go to "winner", else go to "results"
            if (winner) {
              clearInterval(this.interval);
              this.setState({ phase: "winner" });
              this.setState({ ideas: this.state.survivors });
            } else {
              this.setState({ phase: "results", timer: 13 });
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

  room() {
    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <h1 className="title room-code">123456</h1>
        <h2 className="room-subtitle">Room Code</h2>
        <div className="room-users-container">
          <span className="room-user-item">{this.props.currentUser.name}</span>
          <span className="room-user-item">Random guest</span>
          <span className="room-user-item">Fake user</span>
          <span className="room-user-item">Not real</span>
          <span className="room-user-item">Space filler</span>
          <span className="room-user-item">Flex Wrap</span>
          <span className="room-user-item">Looks good</span>
        </div>
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

//room => idea-submission => Round 1(results) => voting phase => check if winner
//if no winner => Round 2
//if winner => winner
//phase states: room, idea-submission, results, voting phase, winner
//if phase === room, phase: idea-submission
//if phase === idea-submission, phase: Results (check round #, increment)
//if phase === results, check winner, phase: voting or phase: winner
//if phase === voting, phase: Results (check round #, increment)
//if phase === winner


//keep ideas in array in room state

//keep idea_number in room state

//when timer hits 0 add 1 to idea_number and render unless
//idea number >= array.length - 1