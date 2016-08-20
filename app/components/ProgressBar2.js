import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { goal, getGoal, putGoal, deleteGoal} from '../actions/goal.js'

import {Line} from 'rc-progress';
const SPACE = "  ";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.progress || [],
      name: '',
      target: 0,
      typeValue: 'Exercise',
      measurementValue: 'Lbs',
      description: ''
    };
  }

  renderProgressBar() {
    console.log("line 31 inside progress bar=========", this.props.progress)
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

    // componentWillReceiveProps(nextProps) {
    //   this.setState({
    //     goal: {
    //       name: this.state.goal.name,
    //       target: this.state.goal.target,
    //       typeValue: this.state.goal.typeValue
    //     }
    //   });
    // }

    // componentDidMount() {
    //   this.setState({
    //       name: this.state.name,
    //       target: this.state.target,
    //       typeValue: this.state.typeValue
    //   });
    // }


  handleInput(event) {
    this.setState({
        name: this.state.name,
        target: this.state.target,
        typeValue: this.state.typeValue,
        measurementValue: this.state.measurementValue
    });
    event.preventDefault();
    const goalObj = {
      name: this.state.name,
      target: this.state.target,
      typeValue: this.state.typeValue,
      measurementValue: this.state.measurementValue,
      description: this.state.description
    }
    this.props.dispatch(goal(goalObj)); //call the action creator and pass data
  }

  handleNameChange(event) {
    this.setState({
        name: event.target.value,
    });
  }

  handleTargetChange(event) {
    this.setState({
        target: event.target.value
    });
  }

  handleSelectBoxChangeType(event) {
    this.setState({
        typeValue: event.target.value
    });
  }

  handleSelectBoxChangeMeasurement(event) {
    this.setState({
        measurementValue: event.target.value
    });
  }

  handleDescriptionChange(event) {
      this.setState({
        description: event.target.value
    });
  }

render() {
    const progressBar = this.renderProgressBar();
      return (
        <div>
          <h2><strong>Create Goals:</strong></h2>
          {progressBar}
          <div className="container">

            <form onSubmit={this.handleInput.bind(this)}>

              <label>Name of activity</label>
              <input type="text" name="name" id="name" placeholder="Bench Press"
                  value={this.state.name}
                  onChange={this.handleNameChange.bind(this)} />

              <label>Target</label>
              <input type="number" name="lbs-reps" id="lbs" placeholder="Lbs"
                  value={this.state.target}
                  onChange={this.handleTargetChange.bind(this)} />

              <button type="submit">Submit</button>
            </form>
          </div>

          <div>
            <label>Measurement</label>
            <div>
              <select
                  onChange={this.handleSelectBoxChangeMeasurement.bind(this)} >
                  <option value="Lbs">Lbs</option>
                  <option value="Miles">Miles</option>
              </select>
            </div>

            <label>Type of activity</label>
            <div>
              <select
                  onChange={this.handleSelectBoxChangeType.bind(this)} >
                  <option value="Exercise">Exercise</option>
                  <option value="Diet">Diet</option>
              </select>
            </div>

            <label>Description</label>
            <input type="text" name="description" id="description" placeholder="Describe goal"
                value={this.state.description}
                onChange={this.handleDescriptionChange.bind(this)} />
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
