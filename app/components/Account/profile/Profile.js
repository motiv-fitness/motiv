import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../../actions/auth';
import { link, unlink } from '../../../actions/oauth';
import Messages from '../../Messages';
import Bio from './Bio';
import Tab from './Tab';
import Stat from './Stat';
import Milestone from './Milestone';
import Goal from './Goal';
import _ from 'lodash';
import UploadButton from '../../UploadButton';
import Diet from '../../Regime/Diet/Diet';
import Supplements from '../../Supplement/SupplementView';
import Exercise from '../../Regime/Exercise/Exercise';
import RegimeDiet from '../../Regime/Diet/RegimeDiet';
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
    const statList = _.map(this.state.stats, (stat, index) => {
      return (<Stat key={index} {...stat} />);
    });

    const goalList = _.map(this.state.goals, (goal, index) => {
      return (<Goal key={index} {...goal} />);
    });

    const milestoneList = _.map(this.state.milestones, (milestone, index) => {
      return (<Milestone key={index} {...milestone} />);
    });

    const followerButton = (this.state.user.id === this.props.loggedInUser.id) 
      ? '' 
      : (<AddFriendButton {...this.state} />);



    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Messages messages={this.props.messages}/>
          <Bio {...this.state.user} />

          <hr />

          <div className="bio-div">
            <h4>Stat</h4>
              {statList}
          </div>

          <hr />

          <div className="bio-div">
            <h4>Goals</h4>
              {goalList}
          </div>

          <hr />

          <div className="bio-div">
            <h4>Milestone</h4>
              {milestoneList}
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
    stats: state.profile.stats,
    milestones: state.profile.milestones,
    messages: state.messages,
    loggedInUser: state.auth.user
  };
};

export default connect(mapStateToProps)(ReadOnlyProfile);
