import React from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import "./splash.css";

class SplashPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      roomCode: "",
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createRoom = this.createRoom.bind(this);

    this.sendRoom = this.sendRoom.bind(this);
    this.roomId = "";
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
    // if (this.state.errors) this.props.openModal("error");
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchRoomByCode(this.state.roomCode)
      .then(res => {
        this.sendRoom(res);
      });
  }

  sendRoom(res){
    this.props.history.push(`/room/${res.roomId.data._id}`);
  }


  createRoom() {
    this.props.addRoom().then(res => this.props.history.push(`/room/${res.roomId.data._id}`));
  }

  render() {
    let logoutButton;
    let authButtons;
    if (this.props.loggedIn) {
      logoutButton = <button className="link-btn logout-btn" onClick={this.props.logout}><FontAwesomeIcon icon={faUser} /> {this.props.currentUser.name}</button>
      authButtons = <>
        <Link onClick={this.createRoom} className="link-btn room-btn" to={"/room"}>Create Room</Link>
      </>
    } else {
      authButtons = <>
        <Link className="link-btn" to={"/login"}>Login</Link>
        <Link className="link-btn" to={"/register"}>Register</Link>
      </>
    }

    return (
      <div className="content">
        <Modal errors={this.state.errors} />
        <nav className="nav">
          <button className="btn-circle" onClick={() => this.props.openModal("about")}><FontAwesomeIcon icon={faQuestion} /></button>
          {logoutButton}
        </nav>
        <h1 className="logo">choosy</h1>
        <div className="splash-auth">
          {authButtons}
        </div>
        <div className="divider"><p>or</p></div>
        <form className="splash-join-room" onSubmit={this.handleSubmit}>
          <input className="join-input" onChange={this.handleInput("roomCode")} type="text" value={this.state.roomCode} placeholder="Enter room code"/>
          <button className="link-btn">Join Room</button>
        </form>
      </div>
    );
  }
}

export default SplashPage;
