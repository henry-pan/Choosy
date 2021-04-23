import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./idea_submission.css";

class IdeaItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleIdeaDelete = this.handleIdeaDelete.bind(this);
  }


  handleIdeaDelete(e) {
    e.preventDefault();
    this.props.deleteIdea(this.props.id);
    console.log("idea_item this.props: ", this.props);
  }

  render() {
    return (
      <li className="idea-item">
        <button className="link-btn idea-btn" onClick={this.handleIdeaDelete}><FontAwesomeIcon icon={faTrash} /></button>
        <h3 className="idea-item-body">{this.props.body}</h3>
      </li>
    )
  }
}

export default IdeaItem
