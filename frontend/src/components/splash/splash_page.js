import React from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import "./splash.css";

class SplashPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      roomCode: "",
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const user = Object.assign({}, this.state);
    // console.log("This would have entered the room: ", this.state.roomCode);
    this.props.openModal("join");
  }

  renderErrors(){
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    
    let logoutButton;
    let authButtons;
    if (this.props.loggedIn) {
      logoutButton = <button className="link-btn logout-btn" onClick={this.props.logout}>{this.props.currentUser.name}</button>
      authButtons = <>
        <Link className="link-btn room-btn" to={"/room"}>Create Room</Link>
      </>
    } else {
      authButtons = <>
        <Link className="link-btn" to={"/login"}>Login</Link>
        <Link className="link-btn" to={"/register"}>Register</Link>
      </>
    }

    return (
      <div className="splash-main">
        <Modal roomCode={this.state.roomCode}/>
        <div className="splash-nav">
          <button className="btn-circle" onClick={() => this.props.openModal("about")}>?</button>
          {logoutButton}
        </div>
        <h1 className="logo">choosy</h1>
        <div className="splash-auth">
          {authButtons}
        </div>
        <div className="divider"><p>or</p></div>
        <form className="splash-join-room" onSubmit={this.handleSubmit}>
          <input className="join-input" onChange={this.handleInput("roomCode")} type="text" value={this.state.roomCode} placeholder="Enter room code"/>
          {this.renderErrors()}
          <button className="link-btn">Join Room</button>
        </form>
      </div>
    );
  }
}

export default SplashPage;
