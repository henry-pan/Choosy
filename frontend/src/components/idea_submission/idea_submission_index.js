import React from 'react';
import IdeaItem from './idea_item';
import { Redirect } from 'react-router-dom';


class IdeaSubmissionIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser,
      ideaList: this.props.userIdeas,
      currentIdea: {
        user: this.props.currentUser,
        body: '',
        score: 0
      },
      secondsLeft: 31,
      update: false
    }
    this.update = this.update.bind(this);
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  update() {
    return (e) => {
      this.setState({ currentIdea: { body: e.currentTarget.value } })
    }
  }

  componentDidMount() {
    // this.countdown()
    this.props.fetchUserIdeas(this.state.user.id)
  }



  countdown() {
    //takes one second off timer
    let seconds = this.state.secondsLeft - 1
    this.setState({
      secondsLeft: seconds
    })
    if (seconds > 0) {
      setTimeout(this.countdown, 1000)
    }
  }

  handleIdeaSubmit(e) {
    e.preventDefault();
    this.props.addIdea(this.state.currentIdea)
    console.log(this.props.userIdeas)
  }

  render() {
    // if ((typeof this.props.userIdeas === 'object')) return null;
    // const timeLeft = this.state.secondsLeft;
    // if (timeLeft === 0) {
    //   return <Redirect to='/result'/>
    // }
    return (
      <div className="idea-submission-index-div">
        <h3 className='idea-submission-timer'>{this.props.timer}</h3>
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
  };
}

export default IdeaSubmissionIndex;
