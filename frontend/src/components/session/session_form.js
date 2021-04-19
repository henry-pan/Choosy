import React from "react";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

  handleDemo(user, e) {
    e.preventDefault();
    this.props.processForm({ username: user, password: "123456" });
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
    let emailInput;
    let password2Input;
    if (this.props.formType === "Register") {
      emailInput = <input onChange={this.handleInput("email")} type="text" value={this.state.email} placeholder="Your email"/>;
      password2Input = <input onChange={this.handleInput("password2")} type="password" value={this.state.password2} placeholder="Confirm your password"/>;
    }
    
    let demoLogin;
    if (this.props.formType === "Login") {
      demoLogin = <>
        <div>
          <button onClick={(e) => this.handleDemo("Demo", e)}>Demo Login</button>
        </div>
        <div className="divider"><p>or</p></div>
      </>;
    }

    return (
      <div>
        <h1>Choosy</h1>
        {demoLogin}
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput("username")} type="text" value={this.state.username} placeholder="Your username"/>
          {emailInput}
          <input onChange={this.handleInput("password")} type="password" value={this.state.password} placeholder="Your password"/>
          {password2Input}
          {this.renderErrors()}
          <button>{this.props.formType}</button>
        </form>
      </div>
    );
  
  }
}

export default SessionForm;
