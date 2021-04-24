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
      user: this.props.currentUser,
      ideaList: this.props.userIdeas,
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
  }

  update() {
    return (e) => this.setState({ currentIdea: { body: e.currentTarget.value } })
    }

  handleIdeaSubmit(e) {
    e.preventDefault();
    this.props.addIdea(this.state.currentIdea);
    e.target.reset();
  }


  render() {
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
