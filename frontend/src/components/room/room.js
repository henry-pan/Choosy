import React from "react";
import { Link } from "react-router-dom";
import voting_phase from "../voting_phase/voting_phase";
import IdeaSubmissionContainer from "../idea_submission/idea_submission_container";
import VotingResultsContainer from "../voting_results/voting_results_container";
import VotingPhaseContainer from "../voting_phase/voting_phase_container";
import VotingWinnerContainer from "../voting_winner/voting_winner_container";


class Room extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      phase: "room",
      round: 1,
      winner: false,
      timer: 10,
      ideas: [],
      idea_num: 0
    };

    this.interval = 0;
    this.countdown = this.countdown.bind(this);
    this.handleRoomStart = this.handleRoomStart.bind(this);
  }

  handleRoomStart() {
    this.setState({ phase: "idea-submission" });
    this.interval = setInterval(this.countdown, 1000)
  }

  scoreIdeas() {
    

  }

  //we already have an array of idea items
  //iterate through array, push idea scores into new array
  //sort new array from low to high
  //get low_score at index (arr.length / 4)
  //while low_score < score at index (arr.length - 1)
  //iterate through array of idea items, if score is <= low_score, delete

  countdown() {
    this.setState({ timer: this.state.timer - 1 })
    if (this.state.timer === 0) {
      switch (this.state.phase) {
        case "idea-submission":
          console.log("idea to results")
          this.setState({ phase: "results", timer: 10 });

          break;
        case "results":
          clearInterval(this.interval);
          this.setState({
            phase: "voting",
            timer: 10,
            round: this.state.round + 1,
            idea_num: 0
           });

          break;
        case "voting":
          if (this.state.idea_num >= this.state.ideas.length - 1) {
            this.setState({ phase: "winner" });
          } else {
            this.setState({ idea_num: this.state.idea_num + 1 })
          }

          break;
      }
    }
  }

  room() {
    return (
      <div>
        <h1>Welcome, {this.props.currentUser.name}. You are in the room.</h1>
        <button onClick={this.handleRoomStart}>Start</button>
      </div>
    );
  }

  render() {
    if (!this.props.currentUser) return null;
    switch (this.state.phase) {
      case "room":
        return this.room()
      case "idea-submission":
        return <IdeaSubmissionContainer timer={this.state.timer}/>
      case "results":
        return <VotingResultsContainer round={this.state.round} />
      case "voting":
        return <VotingPhaseContainer idea={this.state.ideas[this.state.idea_num]}/>
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