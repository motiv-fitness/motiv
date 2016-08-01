import React, {Component} from 'react';
import {connect} from 'react-redux';

<<<<<<< HEAD
var Line = require('rc-progress').Line;
var SPACE = ".............";

class ProgressBar extends Component {
  renderProgressBar() {
    return this.props.images.map((user) => {
      return (
        <div>
          <h3>Progress Bar</h3>
          <Line percent={25} />
          <div>
            <strong>Name:</strong> {user.name} {SPACE}
          </div>
        </div>
      )
    })
  }

render() {
    console.log("Inside goals.js====================")
    return (
      <div>
        {this.renderProgressBar()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.UserGoals
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
