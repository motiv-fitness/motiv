import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../../actions/auth';
import { link, unlink } from '../../../actions/oauth';
import Messages from '../../Messages';
import Bio from './Bio';
import Tab from './Tab';
import Image from './Image';
import Goal from './Goal';
import _ from 'lodash';
import UploadButton from '../../UploadButton';
import Diet from '../../Regime/Diet/Diet';
import Supplements from '../../Supplement/SupplementView';
import Exercise from '../../Regime/Exercise/Exercise';
import Timeline from '../../Timeline/Main';
import AddFriendButton from '../../AddFriendButton';

class ReadOnlyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user || {},
      goals: this.props.goals || [],
      stats: this.props.stats || [],
      milestones: this.props.milestones || [],
      contents: this.props.contents || []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      goals: nextProps.goals,
      stats: nextProps.stats,
      milestones: nextProps.milestones,
      contents: nextProps.contents
    });
  }

  render() {
    const goalList = _.map(this.state.goals, (goal, index) => {
      return (<Goal key={index} {...goal} />);
    });

    const followerButton = (this.state.user.name === undefined || this.state.user.id === this.props.loggedInUser.id)
      ? undefined
      : (<AddFriendButton {...this.state} />);

    const bio = this.state.user.name
      ? (<Bio {...this.state.user} />)
      : (<Image src='./assets/loading-more.gif' />);

    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Messages messages={this.props.messages}/>
          {bio}
          <hr />
          <div className="bio-div">
            <h4>Goals</h4>
              {goalList}
          </div>
        </div>
        <div className="col-md-10">
          <div className="pull-right">{followerButton}</div>
          <ul className="nav nav-tabs">
            <li className="active"><a href="#diet" data-toggle="tab">Diet</a></li>
            <li><a href="#supplement" data-toggle="tab">Supplement</a></li>
            <li><a href="#exercise" data-toggle="tab">Exercise</a></li>
            <li><a href="#timeline" data-toggle="tab">Timeline</a></li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <div className="tab-pane fade active in" id="diet">
              <Diet />
            </div>
            <div className="tab-pane fade" id="supplement">
              <Supplements />
            </div>
            <div className="tab-pane fade" id="exercise">
              <Exercise />
            </div>
            <div className="tab-pane fade" id="timeline">
              <Timeline />
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
    goals: state.profile.goals,
    messages: state.messages,
    loggedInUser: state.auth.user
  };
};

export default connect(mapStateToProps)(ReadOnlyProfile);
