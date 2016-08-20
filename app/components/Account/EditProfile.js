import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../actions/auth';
import { link, unlink } from '../../actions/oauth';
import Messages from '../Messages';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location || '',
      url: props.user.url,
      password: '',
      confirm: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider))
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  render() {
    const facebookLinkedAccount = this.props.user.facebook ? (
      <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'facebook')}>Unlink your Facebook account</a>
    ) : (
      <a href="#" role="button" onClick={this.handleLink.bind(this, 'facebook')}>Link your Facebook account</a>
    );  
    const googleLinkedAccount = this.props.user.google ? (
      <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'google')}>Unlink your Google account</a>
    ) : (
      <a href="#" role="button" onClick={this.handleLink.bind(this, 'google')}>Link your Google account</a>
    );
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
              <form onSubmit={this.handleProfileUpdate.bind(this)}>
                <div className="card-content">
                  <h1>Profile Information</h1>
                  <br />
                  <hr />
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon1">Name:</span>
                    <input id="name"
                           type="name"
                           name="name"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.name} 
                           aria-describedby="basic-addon1" 
                           required
                           autoFocus />
                  </div>
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon2">Email:</span>
                    <input id="email"
                           type="email"
                           name="email"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.email} 
                           aria-describedby="basic-addon2" 
                           required />
                  </div>
                  <label>Gender</label>
                  <input type="radio" name="gender" id="male" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/>
                  <label htmlFor="male">Male</label>
                  <input type="radio" name="gender" id="female" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/>
                  <label htmlFor="female">Female</label>
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon3">Location:</span>
                    <input id="location"
                           type="text"
                           name="location"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.location} 
                           aria-describedby="basic-addon3" 
                           required />
                  </div>
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon4">Url:</span>
                    <input id="url"
                           type="text"
                           name="url"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.url} 
                           aria-describedby="basic-addon4" 
                           required />
                  </div>    
                </div>
                <br />
                <div className="card-action">
                  <button className="btn btn-primary login-button" 
                            type="submit">Update Profile</button>
                </div>
                <br />
              </form>
            </div>
            <div className="card">
              <form onSubmit={this.handleChangePassword.bind(this)}>
                <div className="card-content">  
                  <h1>Password</h1>
                  <br />
                  <hr />
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon5">New Password:</span>
                    <input id="password"
                           type="password"
                           name="password"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.password} 
                           aria-describedby="basic-addon5" 
                           required />
                  </div>
                  <div className="input-group login-input-group">
                    <span className="input-group-addon" id="basic-addon6">Confirm Password:</span>
                    <input id="confirm"
                           type="password"
                           name="confirm"
                           className="form-control"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.confirm} 
                           aria-describedby="basic-addon6" 
                           required />
                  </div>
                </div>
                <br />
                <div className="card-action">
                    <button className="btn btn-primary login-button" 
                              type="submit">Change Password</button>
                </div>
                <br />
              </form>
            </div>
            <div className="card">
              <div className="card-content">
                <h1>Linked Accounts</h1>
                <br />
                <hr />
                <p>{facebookLinkedAccount}</p>
                <p>{googleLinkedAccount}</p>
              </div>
              <br />
              <div className="card-action">
                <form onSubmit={this.handleDeleteAccount.bind(this)}>
                  <p>You can delete your account, but keep in mind this action is irreversible.</p>
                  <button className="btn btn-danger login-button" type="submit">Delete my account</button>
                </form>
              </div>
              <br />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(EditProfile);
