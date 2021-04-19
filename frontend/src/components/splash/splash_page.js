import React from "react";
import { Link } from "react-router-dom";

class SplashPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      roomCode: ""
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  render() {

    let logoutButton;
    let authButtons;
    if (this.props.loggedIn) {
      logoutButton = <button onClick={this.props.logout}>Log Out</button>
      authButtons = <>
        <Link to={"/room"}>Create Room</Link>
      </>
    } else {
      authButtons = <>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </>
    }

    return (
      <div>
        {logoutButton}
        <h1>Choosy</h1>
        {authButtons}
        <div className="divider"><p>or</p></div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput("roomCode")} type="text" value={this.state.roomCode} placeholder="Enter room code"/>
          {this.renderErrors()}
          <button>Join Room</button>
        </form>
      </div>
    );
  }
}

export default SplashPage;
