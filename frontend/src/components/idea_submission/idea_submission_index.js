import React from 'react';
import IdeaItem from './idea_item';

class IdeaSubmissionIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaList: [],
      currentIdea: '',
      secondsLeft: 31
    }
    this.update = this.update.bind(this);
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this);
    this.countdown = this.countdown.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
  }

  update() {
    return (e) => {
      this.setState({ currentIdea: e.currentTarget.value })
    }
  }

  componentDidMount() {
    this.countdown()
  }

  countdown() {
    //takes one second off timer
    let seconds = this.state.secondsLeft - 1
    this.setState({
      secondsLeft: seconds
    })
    if (seconds === 0) {
      this.handleListSubmit();
    } else {
      setInterval(this.countdown, 1000)
    }
  }

  handleListSubmit() {
    //add list submission here
  }

  handleIdeaSubmit() {
    let newIdeaList = this.state.ideaList.push(this.state.currentIdea)
    this.setState({ ideaList: newIdeaList, currentIdea: '' })
  }

  render() {
    const timeLeft = this.state.secondsLeft
    return (
      <div className="idea-submission-index-div">
        <h3 className='idea-submission-timer'>{timeLeft}</h3>
        <ul className="ideas-list">
          {
            this.state.ideaList.map(idea => (
              <IdeaItem
                key={`idea${idea.id}`}
                body={idea.body}/>
              )
            )
          }
        </ul>
        <div className="idea-submission-form-div">
          <form className="idea-submission-form">
            <div className="idea-submission-input">
              <input type="text"
                className="idea-body-input"
                placeholder="Enter Idea"
                onChange={this.update()} />
            </div>
            <button className="create-idea-button" onClick={this.handleIdeaSubmit}>
              <h3 className="create-idea-button-name">Add list</h3>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default IdeaSubmissionIndex;
