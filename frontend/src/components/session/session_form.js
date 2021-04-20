import React from "react";
import { withRouter } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
    let usernameInput;
    let password2Input;
    if (this.props.formType === "Register") {
      usernameInput = <input onChange={this.handleInput("name")} type="text" value={this.state.name} placeholder="Your name"/>;
      password2Input = <input onChange={this.handleInput("password2")} type="password" value={this.state.password2} placeholder="Confirm your password"/>;
    }
    
    let demoLogin;
    if (this.props.formType === "Login") {
      demoLogin = <>
        <div>
          <button onClick={(e) => this.handleDemo("demo@demo.com", e)}>Demo Login</button>
        </div>
        <div className="divider"><p>or</p></div>
      </>;
    }

    return (
      <div>
        <h1>Choosy</h1>
        {demoLogin}
        <form onSubmit={this.handleSubmit}>
          {usernameInput}
          <input onChange={this.handleInput("email")} type="email" value={this.state.email} placeholder="Your email"/>
          <input onChange={this.handleInput("password")} type="password" value={this.state.password} placeholder="Your password"/>
          {password2Input}
          {this.renderErrors()}
          <button>{this.props.formType}</button>
        </form>
      </div>
    );
  
  }
}

export default withRouter(SessionForm);
