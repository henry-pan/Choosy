import React from 'react';

class IdeaItem extends React.Component {
  
  handleIdeaDelete(e) {
    e.preventDefault();
    console.log(this.props)
    this.props.destroyIdea(this.props.key)
  }

  render() {
    return (
      <li className='idea-item'>
        <h3 className='idea-item-body'>{this.props.body}</h3>
      </li>
    )
  }
}

export default IdeaItem
