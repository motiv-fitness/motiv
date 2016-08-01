import React, {Component} from 'react';
import {connect} from 'react-redux';

<<<<<<< HEAD
var Line = require('rc-progress').Line;
var SPACE = ".............";

class ProgressBar extends Component {
  renderProgressBar() {
    return this.props.users.map((user) => {
      return (
        <div>
          <Line percent={(user.goals.currentBench / user.goals.benchPress) * 100} strokeWidth={2} />
          <div>
            <strong>Name:</strong> {user.name} {SPACE}
            <strong>Bench goal:</strong> {user.goals.benchPress} {SPACE}
            <strong>Bench now:</strong> {user.goals.currentBench} {SPACE}
            <strong>Line Progress:</strong> {(user.goals.currentBench / user.goals.benchPress) * 100}%
          </div><br/>
        </div>
      )
    })
  }

render() {
    console.log("Inside ProgressBar.js====================")
    return (
      <div>
        <h2>Progress Bar</h2>
        {this.renderProgressBar()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.goals
  };
}

export default connect(mapStateToProps)(ProgressBar);
=======
class ProgressBar extends Component {
  renderProgressBar() {
    return (?????)
  }



  render() {
    return (
      <div className='progress-bar'></div>
    )
  }
}
>>>>>>> [Add folders] reducers and containers
