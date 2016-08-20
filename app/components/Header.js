import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout(event) {
    this.props.dispatch(logout());
  }

  render() {
    const rightNav = !this.props.token ? (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            <img className="avatar"
                 src={ this.props.user.picture || this.props.user.gravatar}/>
              {' '}{this.props.user.name || this.props.user.email}{' '}
              <span className="caret"></span>
          </a>
          <ul className="dropdown-menu" role="menu">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/account">Settings</Link></li>
            <li className="divider"></li>
            <li><Link to="/login" onClick={this.handleLogout.bind(this)}>Logout</Link></li>
          </ul>
        </li>
      </ul>
    );
    return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <IndexLink className="navbar-brand" to="/">Motiv</IndexLink>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              {rightNav}
            </div>
          </div>
        </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Header);
