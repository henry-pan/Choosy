import React from "react";
import Modal from "../modal/modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./auth.css";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      showPass: false,
      showPass2: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.togglePassword2 = this.togglePassword2.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ errors: this.props.errors });
      if (this.state.errors) this.props.openModal("error");
    }
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  togglePassword(e) {
    e.preventDefault();
    this.setState({ showPass: !this.state.showPass });
  }

  togglePassword2(e) {
    e.preventDefault();
    this.setState({ showPass2: !this.state.showPass2 });
  }


  handleDemo(userEmail, e) {
    e.preventDefault();
    this.props.processForm({ email: userEmail, password: "123456" });
  }
  
  render() {
    let passType = (this.state.showPass ? "text" : "password");
    let passType2 = (this.state.showPass2 ? "text" : "password");
    let showPass = (this.state.showPass ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />);
    let showPass2 = (this.state.showPass2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />);
    
    let usernameInput;
    let password2Input;
    if (this.props.formType === "Register") {
      usernameInput = <input className="auth-input" onChange={this.handleInput("name")} type="text" value={this.state.name} placeholder="Your name"/>;
      password2Input = (
        <div className="auth-pass-container">
          <input className="auth-input-pass" onChange={this.handleInput("password2")} type={passType2} value={this.state.password2} placeholder="Confirm password"/>
          <span className="auth-show-pass" tabIndex="-1" onClick={this.togglePassword2}>{showPass2}</span>
        </div>
      );
    }
    
    let demoLogin;
    if (this.props.formType === "Login") {
      demoLogin = <>
        <button className="link-btn" onClick={(e) => this.handleDemo("demo@demo.com", e)}>Demo Login</button>
        <div className="divider"><p>or</p></div>
      </>;
    }

    return (
      <div className="content">
        <Modal errors={this.state.errors} />
        <nav className="nav">
          <Link className="btn-circle" to="/"><FontAwesomeIcon icon={faChevronLeft} /></Link>
        </nav>
        <div className="logo-container">
          <h1 className="logo">choosy</h1>
          <h2 className="tagline">Make choosing easy</h2>
        </div>
        {demoLogin}
        <form className="auth-form" onSubmit={this.handleSubmit}>
          {usernameInput}
          <input className="auth-input" onChange={this.handleInput("email")} type="email" value={this.state.email} placeholder="Your email"/>
          <div className="auth-pass-container">
            <input className="auth-input-pass" onChange={this.handleInput("password")} type={passType} value={this.state.password} placeholder="Your password"/>
            <span className="auth-show-pass" tabIndex="-1" onClick={this.togglePassword}>{showPass}</span>
          </div>
          {password2Input}
          <button className="link-btn" >{this.props.formType}</button>
        </form>
      </div>
    );
  
  }
}

export default SessionForm;
