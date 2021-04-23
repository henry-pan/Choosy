import React from "react";
import IdeaItem from "./idea_item";
import { Link, Redirect } from "react-router-dom";
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
  }


  render() {
    // if ((typeof this.props.userIdeas === "object")) return null;
    // const timeLeft = this.state.secondsLeft;
    // if (timeLeft === 0) {
    //   return <Redirect to="/result"/>
    // }
    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <h3 className="idea-submission-timer">{this.props.timer}</h3>
        <form className="idea-submission-form" onSubmit={this.handleIdeaSubmit}>
          <input type="text"
            className="idea-submission-input"
            placeholder="Think of something"
            value={this.state.body}
            onChange={this.update()} />
          <button className="link-btn idea-submit-btn">Submit</button>
        </form>
        <ul className="ideas-list">
          {
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
      </div>
    )
  };
}

export default IdeaSubmissionIndex;
