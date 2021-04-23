import React from "react";
import IdeaItem from "./idea_item";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./idea_submission.css";


class IdeaSubmissionIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // body: "",
      user: this.props.currentUser,
      ideaList: this.props.userIdeas,
      // ideaList: [],
      currentIdea: {
        user: this.props.currentUser,
        body: "",
        score: 0
      },
      secondsLeft: 31,
      update: false
    }
    this.update = this.update.bind(this);
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this);
    // this.countdown = this.countdown.bind(this);
  }

  update() {
    return (e) => this.setState({ currentIdea: { body: e.currentTarget.value } })
    }

  // componentDidMount() {
    // this.countdown()
    // this.props.fetchUserIdeas(this.state.user.id)
  // }



  // countdown() {
  //   //takes one second off timer
  //   let seconds = this.state.secondsLeft - 1
  //   this.setState({
  //     secondsLeft: seconds
  //   })
  //   if (seconds > 0) {
  //     setTimeout(this.countdown, 1000);
  //   }
  // }

  handleIdeaSubmit(e) {
    e.preventDefault();
    this.props.addIdea(this.state.currentIdea);
    // this.setState({ body: "" });
    e.target.reset();
    console.log("idea_submission_index userIdeas: ", this.props.userIdeas);
  }


  render() {
    // if ((typeof this.props.userIdeas === "object")) return null;
    // const timeLeft = this.state.secondsLeft;
    // if (timeLeft === 0) {
    //   return <Redirect to="/result"/>
    // }
    return (
      <div className="idea-submission-index-div">
        <h3 className="idea-submission-timer">{this.props.timer}</h3>
        <ul className="ideas-list">
          {
            // this.ideasMap()
            this.props.userIdeas.map(idea => (
                <IdeaItem
                  key={`idea${idea._id}`}
                  id={`${idea._id}`}
                  body={idea.body}
                  deleteIdea={this.props.destroyIdea}/>
              )
            )
          }
        </ul>
        <div className="idea-submission-form-div">
          <form className="idea-submission-form" onSubmit={this.handleIdeaSubmit}>
            <div className="idea-submission-input">
              <input type="text"
                className="idea-body-input"
                placeholder="Enter Idea"
                value={this.state.body}
                onChange={this.update()} />
            </div>
            <button className="create-idea-button" >
              <h3 className="create-idea-button-name">Add list</h3>
            </button>
          </form>
        </div>
      </div>
    )
  };
}

export default IdeaSubmissionIndex;
