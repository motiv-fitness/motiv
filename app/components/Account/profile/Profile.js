import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../../actions/auth';
import { link, unlink } from '../../../actions/oauth';
import Messages from '../../Messages';
import Bio from './Bio';
import Tab from './Tab';
import Image from './Image';
// import Goal from './Goal';
import Goal from '../../Goal/GoalView';

import _ from 'lodash';
import UploadButton from '../../UploadButton';
import Feed from '../../Feed';
import Diet from '../../Regime/Diet/Diet';
import Supplements from '../../Supplement/SupplementView';
import Exercise from '../../Regime/Exercise/Exercise';
import Timeline from '../../Timeline/Main';
import AddFriendButton from '../../AddFriendButton';

class ReadOnlyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user || {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user || {}
    });
  }

  render() {
    const goalList = _.map(this.state.user.goals, (goal, index) => {
      return (<Goal key={index} {...goal} />);
    });

    const followerButton = (this.state.user.name === undefined || this.state.user.id === this.props.loggedInUser.id)
      ? undefined
      : (<AddFriendButton {...this.state} />);

    const bio = this.state.user.name
      ? (<Bio {...this.state.user} />)
      : (<Image src='../../assets/loading-more.gif' />);

    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Messages messages={this.props.messages}/>
        </div>
      </div>
      <div className="row bio-row">
        <div className="col-md-10">
          {bio}
          <br />
        </div>
      </div>
      <div className="row profile-contents-row">
        <div className="col-md-10">
          <div className="col-md-5 goals-regime-supplements-div">
            <div className="card">
              <div className="profile-card-header">
                <h3><span className="glyphicon glyphicon-road" aria-hidden="true"></span> Goals </h3>
              </div>
              <div className="card-content">
                <Goal user={this.state.user} />
              </div>
            </div>

            <div className="card">
              <div className="profile-card-header">
                <h3><span className="glyphicon glyphicon-cutlery" aria-hidden="true"></span> Diet </h3>
              </div>
              <div className="card-content">
                <Diet user={this.state.user} />
              </div>
            </div>
            <div className="card">
              <div className="profile-card-header">
                <h3><span className="glyphicon glyphicon-heart" aria-hidden="true"></span> Exercise </h3>
              </div>
              <div className="card-content">
                <Exercise user={this.state.user} />
              </div>
            </div>
            <div className="card">
              <div className="profile-card-header">
                <h3><span className="glyphicon glyphicon-apple" aria-hidden="true"></span> Supplement </h3>
              </div>
              <div className="card-content">
                <Supplements user={this.state.user} />
              </div>
            </div>
          </div>
          <div className="col-md-7 feed-and-timeline-div">
            <div className="profile-follow-div">{followerButton}</div>
            <ul className="nav nav-tabs">
              <li className="active"><a href="#feed" data-toggle="tab">Feed</a></li>
              <li><a href="#timeline" data-toggle="tab">Timeline</a></li>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div className="tab-pane fade active in" id="feed">
                <Feed user={this.state.user} />
              </div>
              <div className="tab-pane fade" id="timeline">
                <Timeline user={this.state.user} />
              </div>
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
    token: state.auth.token,
    user: state.profile.user,
    messages: state.messages,
    loggedInUser: state.auth.user
  };
};

export default connect(mapStateToProps)(ReadOnlyProfile);
