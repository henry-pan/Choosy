import React from 'react';

<<<<<<< HEAD
export default ({ idea }) => {
  return (
    <li className='idea-item'>
      <h3 className='idea-item-body'>{idea.body}</h3>
      {/* add delete button here */}
    </li>
  )
}
=======
class IdeaItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleIdeaDelete = this.handleIdeaDelete.bind(this);
  }


  handleIdeaDelete(e) {
    e.preventDefault();
    this.props.deleteIdea(this.props.id);
    console.log(this.props);
  }

  render() {
    return (
      <li className='idea-item'>
        <h3 className='idea-item-body'>{this.props.body}</h3>
          <button onClick={this.handleIdeaDelete}>delete</button>
      </li>
    )
  }
}

export default IdeaItem
>>>>>>> idea-submission
