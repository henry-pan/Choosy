import React from 'react';
import IdeaItem from './idea_item';
<<<<<<< HEAD
=======
import { Redirect } from 'react-router-dom';

>>>>>>> idea-submission

class IdeaSubmissionIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      ideaList: [],
      currentIdea: '',
      secondsLeft: 31
=======
      user: this.props.currentUser,
      ideaList: this.props.userIdeas,
      currentIdea: {
        user: this.props.currentUser,
        body: '',
        score: 0
      },
      secondsLeft: 31,
      update: false
>>>>>>> idea-submission
    }
    this.update = this.update.bind(this);
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this);
    this.countdown = this.countdown.bind(this);
<<<<<<< HEAD
    this.handleListSubmit = this.handleListSubmit.bind(this);
=======
>>>>>>> idea-submission
  }

  update() {
    return (e) => {
<<<<<<< HEAD
      this.setState({ currentIdea: e.currentTarget.value })
=======
      this.setState({ currentIdea: { body: e.currentTarget.value } })
>>>>>>> idea-submission
    }
  }

  componentDidMount() {
    this.countdown()
<<<<<<< HEAD
=======
    this.props.fetchUserIdeas(this.state.user.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userIdeas.length !== this.props.userIdeas.length) {
      this.props.fetchUserIdeas(this.state.user.id);
      this.setState()
    }
>>>>>>> idea-submission
  }

  countdown() {
    //takes one second off timer
    let seconds = this.state.secondsLeft - 1
    this.setState({
      secondsLeft: seconds
    })
<<<<<<< HEAD
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
=======
    if (seconds > 0) {
      setTimeout(this.countdown, 1000)
    }
  }

  // handleIdeaSubmit() {
  //   let newIdeaList = this.state.ideaList.concat([this.state.currentIdea])
  //   console.log('newIdeaList: ', newIdeaList)
  //   this.setState({ ideaList: newIdeaList, currentIdea: '' })
  // }

  handleIdeaSubmit(e) {
    e.preventDefault();
    this.props.addIdea(this.state.currentIdea)
    console.log(this.props.userIdeas)
  }

  // ideasMap() {
  //   return (
  //     <div>
  //       {this.props.userIdeas.map(idea => (
  //         <IdeaItem
  //           key={`idea${idea.id}`}
  //           body={idea.currentIdea}/>
  //         )
  //       )}
  //     </div>
  //   )
  // }

//{ ideaList: this.props.userIdeas }

  render() {
    // if ((typeof this.props.userIdeas === 'object')) return null;
    console.log(this.state.ideaList);
    const timeLeft = this.state.secondsLeft;
    if (timeLeft === 0) {
      return <Redirect to='/result'/>
    } else return (
>>>>>>> idea-submission
      <div className="idea-submission-index-div">
        <h3 className='idea-submission-timer'>{timeLeft}</h3>
        <ul className="ideas-list">
          {
<<<<<<< HEAD
            this.state.ideaList.map(idea => (
              <IdeaItem
                key={`idea${idea.id}`}
                body={idea.body}/>
=======
            // this.ideasMap()
            this.props.userIdeas.map(idea => (
              <li>
                <IdeaItem
                  key={`idea${idea._id}`}
                  id={`${idea._id}`}
                  body={idea.body}
                  deleteIdea={this.props.destroyIdea}/>

                </li>
>>>>>>> idea-submission
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
<<<<<<< HEAD
  }
=======
  };
>>>>>>> idea-submission
}

export default IdeaSubmissionIndex;
