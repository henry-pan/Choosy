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
      timer: 30,
      ideas: this.props.userIdeas,
      idea_num: 0,
    };
    this.interval = 0;
    this.countdown = this.countdown.bind(this);
    this.handleRoomStart = this.handleRoomStart.bind(this);
    this.scoreIdeas = this.scoreIdeas.bind(this);
  }

  handleRoomStart() {
    this.setState({ phase: "idea-submission" });
    this.interval = setInterval(this.countdown, 1000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userIdeas.length !== this.props.userIdeas.length) {
      this.props.fetchUserIdeas(this.props.currentUser.id);
      this.setState({ ideas: this.props.userIdeas })
    }
  }

  scoreIdeas() {
    console.log("room.js ideas: ", this.state.ideas)
    //array of idea scores, sorted by score
    let scoreArr = this.state.ideas.map(idea => idea.__v).sort();
    console.log("score arr", scoreArr)
    //array of idea scores, sans scores of 0
    let noLosers = scoreArr.filter(idea => idea > 0);
    console.log("noLosers", noLosers)
    //replaces score_arr with no_losers and deletes zeros,
    //unless no_losers is empty or every score is zeros
    if (noLosers.length > 0 && noLosers.length < this.state.ideas.length) {
      scoreArr = noLosers;
      this.state.ideas.forEach(idea => {
        if (idea.__v === 0) {this.props.destroyIdea(idea._id)}
      });
    };
    //gets last item index that should be deleted
    let deleteIndex = Math.floor(scoreArr.length / 2);
    console.log("deleteIndex", deleteIndex)
    //sets winner to true if only one idea remaining
    let winner = false
    if (deleteIndex + 1 === scoreArr.length - 1) {winner = true}
    //gets highest score of item to be deleted
    let lowScore = scoreArr[deleteIndex]
    //gets array of items eligible to be deleted
    let losers = this.state.ideas.filter(idea => (idea.__v <= lowScore) && (idea.__v > 0))
    //delete losers
    for (let i = 0; i < deleteIndex; i++) {
      console.log("losers[i]: ", losers[i])
      this.props.destroyIdea(losers[i])
    }
    return winner
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  countdown() {
    this.setState({ timer: this.state.timer - 1 })
    if (this.state.timer === 0) {
      console.log("room.js: this.state.phase", this.state.phase)
      switch (this.state.phase) {
        case "idea-submission": //moves to results
          this.setState({ phase: "results", timer: 13 });

          break;
        case "results": //moves to voting
          this.interval = setInterval(this.countdown, 1000)
          console.log("voting")
          this.setState({
            phase: "voting",
            timer: 13,
            round: this.state.round + 1,
            idea_num: 0
           });


          break;
        case "voting": //moves to either results or winner or more voting
          console.log("room.js", this.state)
          console.log("this.state.idea_num: ", this.state.idea_num)
          // if the idea number is the number of ideas, check for winner
          if (this.state.idea_num >= this.state.ideas.length - 1) {
            let winner = this.scoreIdeas();
            this.props.fetchUserIdeas(this.props.currentUser.id)
            //if there is a winner go to "winner", else go to "results"
            if (winner) {
              this.setState({ phase: "winner" });
              clearInterval(this.interval)
            } else {
              this.setState({ phase: "results", timer: 10 });
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
      <div>
        <h1>Welcome, {this.props.currentUser.name}. You are in the room.</h1>
        <button onClick={this.handleRoomStart}>Start</button>
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