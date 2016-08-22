import React from 'react';
import {deleteGoal, putGoal} from '../../helpers/goal.js';
import _ from 'lodash';

export default class GoalSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      edit: false,
      goalId: props.goal_id,
      target: props.target || 0,
      measurementValue: props.measurement || '',
      name: props.name || '',
      description: props.description || '',
      typeValue: props.type || '',
      current: props.current || ''
    };
    this.onClickInput = this.onClickInput.bind(this);

    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCurrentChange = this.handleCurrentChange.bind(this);
  };

  componentDidMount() {
    this.setState({
      edit:this.props.edit,
      goalId: this.props.goal_id,
      target: this.props.target,
      measurementValue: this.props.measurement,
      name: this.props.name,
      description: this.props.description,
      typeValue: this.props.type,
      current: this.props.current,
    })
  }

  handleCurrentChange(event) {
    this.setState({
      current: event.target.value
    });
  }

  handleTargetChange(event) {
    this.setState({
      target: event.target.value
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

  handleUpdate(event) {
    event.preventDefault();
    putGoal(this.state)
      .then(() => {
        return this.props.update();
      })
      .then(() => {
        this.setState({
          edit: false
        })
      });
  }

  onClickInput() {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleDeleteInput() {
    return deleteGoal(this.state.goalId)
      .then(() => {
        this.props.update();
      });
  }

  renderPlain(){
    return (
      <div className='display-label-name-list-item'>
         <div className='row'>
           <div className="col-xs-8 display-label-name">
               <span> {this.state.name} </span>:<span> {this.state.target + ' ' +this.state.measurementValue} </span>
           </div>
           <div className="col-xs-4 delete-edit-button">
               <button className="btn btn-primary btn-xs" onClick={this.handleDeleteInput.bind(this)}type='button'>
                 <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
               </button>
               <button className="btn btn-primary btn-xs" onClick={this.onClickInput.bind(this)} type='button'>
                 <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
               </button>
           </div>
        </div>
      </div>
    );
  }

  renderTextArea() {
    return (
      <form onSubmit={this.handleUpdate.bind(this)} 
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
        <div className="row goal-edit-delete-button-div">
          <div className="col-xs-12">
            <button className="btn btn-primary btn-xs" type='submit'>
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            </button>
            <button className="btn btn-primary btn-xs" onClick={this.onClickInput} type='button'>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </form>
    );
  }

  render(){
    var row = this.state.edit ? this.renderTextArea() : this.renderPlain();
    return(
      <div className="goal-row-div">
        {row}
      </div>
    );
  }
}
