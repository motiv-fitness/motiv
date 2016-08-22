import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { goal, getGoal, putGoal, deleteGoal, displayGoal} from '../../helpers/goal.js';

import {Line} from 'rc-progress';

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
        typeValue: this.state.typeValue,
        measurementValue: this.state.measurementValue
    });
    event.preventDefault();
    const goalObj = {
      goalId: this.state.goal_id,
      name: this.state.name,
      target: this.state.target,
      typeValue: this.state.typeValue,
      measurementValue: this.state.measurementValue,
      description: this.state.description,
      current: this.state.current
    }
    this.props.dispatch(goal(goalObj));

    this.setState({
      progress: this.props.progress
    });
  }

  handleUpdateGoal(event) {
    this.setState({
      target: this.state.target,
      measurementValue: this.state.measurementValue,
      description: this.state.description,
      typeValue: this.state.typeValue,
      current: this.state.current
    });
    event.preventDefault();
    const goalAdd = {
      target: this.state.target,
      measurementValue: this.state.measurementValue,
      name: this.state.name,
      description: this.state.description,
      typeValue: this.state.typeValue,
      current: this.state.current
    }
    this.props.dispatch(goal(goalAdd));
  }

  handleTargetChange(event) {
    this.setState({
      target: event.target.value,
    })
  }

  handleMeasurementChange(event) {
    this.setState({
      measurementValue: event.target.value
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
          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"></span>
            <input onChange={this.handleNameChange} type="text" className="form-control" placeholder="Name" aria-describedby="sizing-addon2"/><br/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"></span>
            <input onChange={this.handleTargetChange} type="text" className="form-control" placeholder="Target" aria-describedby="sizing-addon2"/><br/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"></span>
            <input onChange={this.handleMeasurementChange} type="text" className="form-control" placeholder="Measurement" aria-describedby="sizing-addon2"/><br/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"></span>
            <input onChange={this.handleDescriptionChange} type="text" className="form-control" placeholder="Description" aria-describedby="sizing-addon2"/><br/>
          </div>

          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2"></span>
            <input onChange={this.handleTypeChange} type="text" className="form-control" placeholder="Type" aria-describedby="sizing-addon2"/><br/>
          </div>

          <div><button onClick={this.handleUpdateGoal.bind(this)} type="submit">Submit</button></div><br />
          </div>
        );
  }

render() {
    const update = (this.props.progress) ? this.UpdateData() : null;
      return (
        <div>
          <h4>~Add Goal~</h4>
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
