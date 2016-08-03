import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: undefined
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      token: this.props.token
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      token: nextProps.token
    });
  }

  render() {
    const rightNav = this.state.token ? (
      <ul className="list-inline">
          <li>
            <img className="avatar" src={this.state.user.picture || this.state.user.gravatar}/>
            {' '}{this.state.user.name || this.state.user.email || this.state.user.id}{' '}
          </li>
          <li><Link to="/account">Edit Account</Link></li>
          <li><Link to="/profile">View Profile</Link></li>
          <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
      </ul>
    ) : (
      <ul className="list-inline">
          <li><Link to="/login">Log in</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
      </ul>
    );
    return (
      <div className="container">
        <ul className="list-inline">
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        {rightNav}
      </div>
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
