import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { postGoal } from '../../helpers/goal.js';

import {Line} from 'rc-progress';

class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.progress || [],
      target: 0,
      measurementValue: '',
      name: '',
      description: '',
      typeValue: '',
      current: 0,
      showInput: false
    };
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCurrentChange = this.handleCurrentChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      progress: nextProps.progress
    });
  }

  handleInput(event) {
    event.preventDefault();
    this.props.dispatch(goal(this.state));
    this.setState({
      progress: this.props.progress
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    postGoal(this.state)
    .then(() => {
      return this.props.update();
    })
    .then(() => {
      this.setState({
        target: 0,
        measurementValue: '',
        name: '',
        description: '',
        typeValue: '',
        current: 0,
        showInput: false
      });
    });
  }

  handleTargetChange(event) {
    this.setState({
      target: event.target.value,
    });
  }

  handleMeasurementChange(event) {
    this.setState({
      measurementValue: event.target.value
    });
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

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} 
            className='form-inline well'>
        <div className="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input onChange={this.handleNameChange} 
                     type="text" 
                     className="form-control" 
                     placeholder="Name"
                     value={this.state.name} 
                     required/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input onChange={this.handleTargetChange} 
                     type="text" 
                     className="form-control" 
                     placeholder="Target"
                     value={this.state.target}
                     required/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input onChange={this.handleMeasurementChange} 
                     type="text" 
                     className="form-control" 
                     placeholder="Measurement"
                     value={this.state.measurementValue}
                     required/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input onChange={this.handleDescriptionChange} 
                     type="text" 
                     className="form-control" 
                     placeholder="Description"
                     value={this.state.description}
                     required/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input onChange={this.handleTypeChange} 
                     type="text" 
                     className="form-control" 
                     placeholder="Type"
                     value={this.state.typeValue}
                     required/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-xs btn-primary"
                  type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }

  toggleInput() {
    this.setState({
      showInput: !this.state.showInput
    });
  }

  render() {
    const renderedForm = (this.state.showInput) ? this.renderForm() : undefined;
    return (
      <div className="goal-add-div">
        <button className="btn btn-xs btn-primary show-input" 
                type='button' 
                onClick={this.toggleInput.bind(this)}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
        {renderedForm}
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
