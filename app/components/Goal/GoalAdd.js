import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { goal, getGoal, putGoal, deleteGoal, displayGoal} from '../../actions/goal.js';

import {Line} from 'rc-progress';
const SPACE = "..............";

class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.progress || [],
      goalId: '',
      target: 0,
      measurementValue: 'Lbs',
      name: '',
      description: '',
      typeValue: 'Exercise',
      current: 0
    };
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCurrentChange = this.handleCurrentChange.bind(this);
  }

componentWillMount() {
  this.props.dispatch(displayGoal(this.props.user.id)); //call the action creator and pass data
}

componentWillReceiveProps(nextProps) {
  this.setState({
    progress: nextProps.progress
  });
}

handleInput(event) {
    this.setState({
        name: this.state.name,
        target: this.state.target,
        typeValue: this.state.type,
        measurementValue: this.state.measurement
    });
    event.preventDefault();
    const goalObj = {
      goalId: this.state.goal_id,
      name: this.state.name,
      target: this.state.target,
      typeValue: this.state.type,
      measurementValue: this.state.measurement,
      description: this.state.description,
      current: this.state.current
    }
    this.props.dispatch(goal(goalObj)); //call the action creator and pass data

    this.setState({
      progress: this.props.progress
    });
  }

renderProgressBar() {
  return this.state.progress.map((item, index) => {
    if (item.current !== 0) {
      let styleObj = {
        width: '45%'
      }
      return (
        <div key={index} >
          <div className="progress progress-striped active">
            <div className="progress-bar" style={styleObj}></div>
          </div>
          <strong>{item.name} goal: </strong>{item.target} {item.measurement} {SPACE}
          <strong>Now: </strong>{item.current} {item.measurement} {SPACE}
          <strong>Line progress: </strong> { Math.round( (item.current) / (item.target) * 100 ) }%
        </div>
      );
    } else {
      return null;
    }
   })
  }

  handleUpdateGoal(event) {
    this.setState({
      target: this.state.target,
      measurementValue: this.state.measurement,
      name: this.state.name,
      description: this.state.description,
      typeValue: this.state.type,
      current: this.state.current
    });
    event.preventDefault();
    const goalUpdate = {
      target: this.state.target,
      measurementValue: this.state.measurement,
      name: this.state.name,
      description: this.state.description,
      typeValue: this.state.type,
      current: this.state.current
    }
    this.props.dispatch(goal(goalUpdate));
  }

  handleTargetChange(event) {
    this.setState({
      target: event.target.value,
    })
  }

  handleMeasurementChange(event) {
    this.setState({
      measurement: event.target.value
    })
  }

  handleNameChange(event) {
    this.setState({
        name: event.target.value
    });
  }

  handleDescriptionChange(event) {
      this.setState({
        description: event.target.value
    });
  }

  handleTypeChange(event) {
    this.setState({
      typeValue: event.target.value
    })
  }

  handleCurrentChange(event) {
    this.setState({
      current: event.target.value
    })
  }

  UpdateData() {
        return (
          <div>
          <form onSubmit={this.handleUpdateGoal.bind(this)}>
              <label>Target </label>
              <input onChange={this.handleTargetChange} />

              <label>Measurement </label>
              <input onChange={this.handleMeasurementChange} />

              <label>Name </label>
              <input onChange={this.handleNameChange} />

              <label>Description </label>
              <input onChange={this.handleDescriptionChange} />

              <label>Type </label>
              <input onChange={this.handleTypeChange} />

              <div><button type="submit">Submit</button></div>
            </form>

          </div>
        );
  }

render() {
    const update = (this.props.progress) ? this.UpdateData() : null;
      return (
        <div>
          <h2>Add goal</h2>
          {update}
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    progress: state.goals.progress,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(AddGoal);
