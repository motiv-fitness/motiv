import React from 'react';
import {goal, getGoal, putGoal, deleteGoal, displayGoal} from '../../helpers/goal.js';
import _ from 'lodash';
import {connect} from 'react-redux';

class GoalSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      edit: true,
      goalId: props.goal_id,
      target: props.target || 0,
      measurementValue: props.measurement || '',
      name: props.name || '',
      description: props.description || '',
      typeValue: props.type || '',
      current: props.current || ''
    }
    this.onClickInput = this.onClickInput.bind(this);
    this.handleInput = this.handleInput.bind(this);

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
      current: event.target.value,
      target: this.state.target,
      measurementValue: this.state.measurementValue,
      name: this.state.name,
      description: this.state.description,
      typeValue: this.state.typeValue,
    })
  }

  handleTargetChange(event) {
    this.setState({
      target: event.target.value,
      measurementValue: this.state.measurementValue,
      name: this.state.name,
      description: this.state.description,
      typeValue: this.state.typeValue,
      current: this.state.current
    })
  }

  handleMeasurementChange(event) {
    this.setState({
      measurementValue: event.target.value,
      target: this.state.target,
      name: this.state.name,
      description: this.state.description,
      typeValue: this.state.typeValue,
      current: this.state.current
    })
  }

  handleNameChange(event) {
    this.setState({
        name: event.target.value,
        measurementValue: this.state.measurementValue,
        target: this.state.target,
        description: this.state.description,
        typeValue: this.state.typeValue,
        current: this.state.current
    });
  }

  handleDescriptionChange(event) {
      this.setState({
        description: event.target.value,
        name: this.state.name,
        measurementValue: this.state.measurementValue,
        target: this.state.target,
        typeValue: this.state.typeValue,
        current: this.state.current
    });
  }

  handleTypeChange(event) {
    this.setState({
      typeValue: event.target.value,
      name: this.state.name,
      measurementValue: this.state.measurementValue,
      target: this.state.target,
      description: this.state.description,
      current: this.state.current
    })
  }

  handleCurrentChange(event) {
    this.setState({
      current: event.target.value,
      name: this.state.name,
      description: this.state.description,
      measurementValue: this.state.measurementValue,
      target: this.state.target,
      typeValue: this.state.typeValue,
    })
  }

  handleInput(event) {
    // event.preventDefault();
    this.props.dispatch(putGoal(this.state));
    this.setState({
      progress: []
    });
  }

  onClickInput(){
    this.setState({
      edit: !this.state.edit
    })
  }

  renderPlain(){
     return (
       <div>
       <div className="input-group">
       <span className="input-group-addon" id="sizing-addon2"></span>
       <input value={this.state.name} type="text" className="form-control" placeholder="Name" aria-describedby="sizing-addon2"/><br/>
       </div>

       <div className="input-group">
       <span className="input-group-addon" id="sizing-addon2"></span>
       <input value={this.state.target} type="text" className="form-control" placeholder="Target" aria-describedby="sizing-addon2"/><br/>
       </div>

       <div className="input-group">
       <span className="input-group-addon" id="sizing-addon2"></span>
       <input value={this.state.measurementValue} type="text" className="form-control" placeholder="Measurement" aria-describedby="sizing-addon2"/><br/>
       </div>

       <div className="input-group">
       <span className="input-group-addon" id="sizing-addon2"></span>
       <input value={this.state.description} type="text" className="form-control" placeholder="Description" aria-describedby="sizing-addon2"/><br/>
       </div>

       <div className="input-group">
       <span className="input-group-addon" id="sizing-addon2"></span>
       <input value={this.state.typeValue} type="text" className="form-control" placeholder="Type" aria-describedby="sizing-addon2"/><br/>
       </div>

      <div>
        <button onClick={deleteGoal(this.state)} type="submit">Delete</button>
        <button onClick={this.onClickInput} type="submit">Edit</button>
      </div>
       </div>
     )
  }

  renderTextArea() {
    return (
      <div>
        <div className="input-group">
        <span className="input-group-addon" id="sizing-addon2"></span>
        <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" placeholder="Name" aria-describedby="sizing-addon2"/><br/>
        </div>

        <div className="input-group">
        <span className="input-group-addon" id="sizing-addon2"></span>
        <input onChange={this.handleTargetChange} value={this.state.target} type="text" className="form-control" placeholder="Target" aria-describedby="sizing-addon2"/><br/>
        </div>

        <div className="input-group">
        <span className="input-group-addon" id="sizing-addon2"></span>
        <input onChange={this.handleMeasurementChange} value={this.state.measurementValue} type="text" className="form-control" placeholder="Measurement" aria-describedby="sizing-addon2"/><br/>
        </div>

        <div className="input-group">
        <span className="input-group-addon" id="sizing-addon2"></span>
        <input onChange={this.handleTypeChange} value={this.state.typeValue} type="text" className="form-control" placeholder="Type" aria-describedby="sizing-addon2"/><br/>
        </div>

        <div className="input-group">
        <span className="input-group-addon" id="sizing-addon2"></span>
        <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" placeholder="Description" aria-describedby="sizing-addon2"/><br/>
        </div>

        <div><button onClick={this.handleInput.bind(this)} type="submit">Submit</button></div>
      </div>
    )
  }

  render(){
    return(
      <div>{this.state.edit ? this.renderTextArea() : this.renderPlain()}</div>
    )
  }
}

export default connect(null)(GoalSpan);
