import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { signup } from '../../actions/auth';
import { facebookLogin, googleLogin } from '../../actions/oauth';
import Messages from '../Messages';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.dispatch(signup(this.state.name, this.state.email, this.state.password));
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
          <div className="col-md-4 col-md-offset-4">
            <Messages messages={this.props.messages}/>
          </div>
        </div>
        <div className="row login-row">
          <div className="col-md-4 col-md-offset-4">
            <div className="card">
              <div className="card-content">
                <form onSubmit={this.handleSignup.bind(this)}>
                  <h1>Create an account</h1>
                  <br />
                  <hr />
                  <br />
                  <div className="input-group login-input-group">
                    <input id="name"
                           type="name"
                           name="name"
                           placeholder="Name"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.name} 
                           required
                           autoFocus />
                  </div>
                  <div className="input-group login-input-group">
                    <input id="email"
                           type="email"
                           name="email"
                           placeholder="Email"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.email}  
                           required />
                  </div>
                  <div className="input-group login-input-group">
                    <input id="password"
                           type="password"
                           name="password"
                           placeholder="Password"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.password} 
                           aria-describedby="basic-addon3" 
                           required />
                  </div>
                  <button className="btn btn-primary login-button" 
                          type="submit">Create an account</button>
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
                <p>Already have an account? <Link to="/login">Log in</Link></p>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div data-align="center">
          <video autoPlay loop id="video-background" muted>
            <source src="../../assets/stretching.mp4" type="video/mp4"/>
          </video>
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

export default connect(mapStateToProps)(Signup);
