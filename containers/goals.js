import React, {Component} from 'react';
import {connect} from 'react-redux';

class ProgressBar extends Component {
  renderProgressBar() {
    return this.props.images.map((user) => {
      return (
        // AC: START WORK HERE
      )
    })
  }

render() {
    return (
      <div className='progress-bar'></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.UserGoals
  };
}

export default connect(mapStateToProps)(ProgressBar);
