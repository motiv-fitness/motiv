import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';
import { facebookLogin, googleLogin } from '../../actions/oauth';
import Messages from '../Messages';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
  }

  handleFacebook() {
    var location = global.window.location;
    var port = (location.port) ? ':' + location.port : '';
    this.props.dispatch(facebookLogin(location.protocol + '//' + location.hostname + port));
  }

  handleGoogle() {
    var location = global.window.location;
    var port = (location.port) ? ':' + location.port : '';
    this.props.dispatch(googleLogin(location.protocol + '//' + location.hostname + port));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <Messages messages={this.props.messages}/>
          </div>
        </div>
        <div className="row login-row">
          <div className="col-md-4 col-md-offset-4">
            <div className="card">
              <div className="card-content">
                <form onSubmit={this.handleLogin.bind(this)}>
                  <h1>Log In</h1>
                  <hr />
                  <br />
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon1">Email:</span>
                    <input id="email"
                           type="email"
                           name="email"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.email} 
                           aria-describedby="basic-addon1" 
                           required
                           autoFocus />
                  </div>
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon2">Password:</span>
                    <input id="password"
                           type="password"
                           name="password"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.password} 
                           aria-describedby="basic-addon2" 
                           required/>
                  </div>
                  <p><Link to="/forgot">Forgot your password?</Link></p>
                  <button className="btn btn-primary login-button" 
                          type="submit">Log in</button>
                </form>
                <br /><br />
                <hr /> 
              </div>         
              <div className="login-card-action">
                <a className="btn btn-block btn-social btn-facebook"
                   onClick={this.handleFacebook.bind(this)}>
                  <span className="fa fa-facebook"></span>
                  Sign in with Facebook
                </a>
                <a className="btn btn-block btn-social btn-google"
                   onClick={this.handleGoogle.bind(this)}>
                  <span className="fa fa-google"></span>
                  Sign in with Google
                </a>
                <br />
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Login);
