import React from "react";
import IdeaItem from "./idea_item";
import { Link } from "react-router-dom";
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
        roomId: this.props.room,
        user: this.props.currentUser,
        body: "",
        score: 0
      },
      update: false
    }
    this.update = this.update.bind(this);
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this);
  }

  update() {
    return (e) => this.setState({ currentIdea: {
      body: e.currentTarget.value,
      roomId: this.props.room
    } })
  }

  handleIdeaSubmit(e) {
    e.preventDefault();
    this.props.addIdea(this.state.currentIdea);
    this.setState({ currentIdea: { body: "" } });
    e.target.reset();
  }

  // should potentially have a componentDidUpdate here that looks for for changes in state made by other users (if that's possible)

  render() {
    let ideas = this.props.userIdeas.map(idea => (
      <IdeaItem
      key={`idea${idea._id}`}
      id={`${idea._id}`}
      body={idea.body}
      deleteIdea={this.props.destroyIdea}/>
    ));

    return (
      <div className="content">
        <div className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faTimes} /></Link>
        </div>
        <div className="title-container idea-submission-timer">
          <h1 className="title">{this.props.timer}</h1>
          <h2 className="title-blurb">Enter some ideas!</h2>
        </div>
        <form className="idea-submission-form" onSubmit={this.handleIdeaSubmit}>
          <input type="text"
            className="idea-submission-input"
            placeholder="Think of something"
            value={this.state.body}
            onChange={this.update()} />
          <button className="link-btn idea-submit-btn">Submit</button>
        </form>
        <div className="ideas-list-container">
          <ul className="ideas-list">
            {ideas}
          </ul>
        </div>
      </div>
    )
  };
}

export default IdeaSubmissionIndex;
