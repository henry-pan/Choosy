import React from "react";
import { Link, withRouter } from "react-router-dom";
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/");
    }
    this.setState({ errors: nextProps.errors });
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
    let passType = (this.state.showPass ? "text" : "password");
    let passType2 = (this.state.showPass2 ? "text" : "password");
    let usernameInput;
    let password2Input;
    if (this.props.formType === "Register") {
      usernameInput = <input className="auth-input" onChange={this.handleInput("name")} type="text" value={this.state.name} placeholder="Your name"/>;
      password2Input = (
        <div className="auth-pass-container">
          <input className="auth-input-pass" onChange={this.handleInput("password2")} type={passType2} value={this.state.password2} placeholder="Confirm password"/>
          <span className="auth-show-pass" tabIndex="-1" onClick={this.togglePassword2}>👁️</span>
        </div>
      );
    }
    
    let demoLogin;
    if (this.props.formType === "Login") {
      demoLogin = <>
        <button className="link-btn auth-btn" onClick={(e) => this.handleDemo("demo@demo.com", e)}>Demo Login</button>
        <div className="divider"><p>or</p></div>
      </>;
    }

    return (
      <div className="auth-main">
        <div className="auth-nav">
          <Link className="link-btn about-btn" to="/">&lt;</Link>
        </div>
        <h1 className="auth-logo">choosy</h1>
        {demoLogin}
        <form className="auth-form" onSubmit={this.handleSubmit}>
          {usernameInput}
          <input className="auth-input" onChange={this.handleInput("email")} type="email" value={this.state.email} placeholder="Your email"/>
          <div className="auth-pass-container">
            <input className="auth-input-pass" onChange={this.handleInput("password")} type={passType} value={this.state.password} placeholder="Your password"/>
            <span className="auth-show-pass" tabIndex="-1" onClick={this.togglePassword}>👁️</span>
          </div>
          {password2Input}
          {this.renderErrors()}
          <button className="link-btn auth-btn" >{this.props.formType}</button>
        </form>
      </div>
    );
  
  }
}

export default withRouter(SessionForm);
