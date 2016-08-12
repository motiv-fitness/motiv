import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {goal, getGoal, putGoal, deleteGoal} from '../actions/goal.js'

import {Line} from 'rc-progress';
const SPACE = "............";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.progress || [],
      goal: {
        name: '',
        target: 0
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      progress: nextProps.progress
    });
  }

  // renderProgressBar() {
  //   console.log("line 31 inside progress bar=========", this.state.progress)
  //   if(this.state.progress && Array.isArray(this.state.progress)) {
  //     return _.map(this.state.progress, (goal, index) => {
  //       return (
  //         <div key={index}>
  //           <Line percent={(goal.current / goal.target) * 100} strokeWidth={2} />
  //           <div>
  //             <strong>{goal.name} goal:</strong> {goal.target} {SPACE}
  //             <strong>{goal.name} now:</strong> {goal.current} {SPACE}
  //             <strong>Line Progress:</strong> {(goal.current / goal.target) * 100}%
  //           </div><br/>
  //         </div>
  //      );
  //    });
  //   } else {
  //     return undefined;
  //   }
  // }

  renderProgressBar() {
    console.log("line 31 inside progress bar=========", this.state.progress)
    if(this.state.progress && Array.isArray(this.state.progress)) {
      return _.map(this.state.progress, (goal, index) => {
        return (
          <div>
            <Line percent={(200 / 225) * 100} strokeWidth={2} />
            <div>
              <strong>Bench goal:</strong> 225 {SPACE}
              <strong>Bench now:</strong> 200 {SPACE}
              <strong>Line Progress:</strong> {(200 / 225) * 100}%
            </div><br/>
          </div>
       );
}

  handleInput(event) {
    event.preventDefault();
    console.log('inside ProgressBar.js benchGoal', this.state.goal)
    this.props.dispatch(goal(this.state.goal)); //call the action creator and pass data
    //this.props.dispatch(getGoal());
    //this.props.dispatch(putGoal(this.state.benchGoal));
    //this.props.dispatch(deleteGoal(this.state.benchGoal));
  }

  handleNameChange(event) {
    this.setState({
      goal: {
        name: event.target.value,
        target: this.state.goal.target
      }
    });
  }

  handleTargetChange(event) {
    this.setState({
      goal: {
        name: this.state.goal.name,
        target: event.target.value
      }
    });
  }

  handleInput(event) {
    event.preventDefault();
    console.log('inside ProgressBar.js benchGoal', this.state.benchGoal)
    this.props.dispatch(goal(this.state.benchGoal)) //call the action creator and pass data
  }

  handleChange(event) {
    this.setState({
      benchGoal: event.target.value
    })
  }

  render() {
    const progressBar = this.renderProgressBar();
    // const progressBar = "The Progress Bar here";
      return (
        <div>
          <h2><strong>My Goals:</strong></h2>
          {progressBar}
          <div className="container">
            <form onSubmit={this.handleInput.bind(this)}>
            <input type="text" name="name" id="name" placeholder="Name"
                value={this.state.goal.name}
                onChange={this.handleNameChange.bind(this)} />
              <input type="number" name="lbs" id="lbs" placeholder="Lbs"
                  value={this.state.goal.target}
                  onChange={this.handleTargetChange.bind(this)} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    progress: state.goals.progress
  };
}

export default connect(mapStateToProps)(ProgressBar);
