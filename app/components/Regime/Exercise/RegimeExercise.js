import React from 'react';
import { deleteExercise } from '../../../helpers/regime';
import { putExercise } from '../../../helpers/regime';

export default class ExerciseSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      edit:false,
      labelInput: '',
      exreciseInput: '',
      regime:{
        label:props.label,
        name:props.name,
        id:props.id,
        type:'exercise'
      }
    }
    this.onClickInput = this.onClickInput.bind(this);
  };
    componentDidMount(){
      this.setState({
        labelInput:this.props.labelInput,
        exerciseInput:this.props.exrciseInput,
        edit:this.props.edit
      })
    }
    handleLabelInputChange(event){
      this.setState({
        regime:{
          label:event.target.value,
          name:this.state.regime.name,
          id:this.state.regime.id
        }
      })
    }
    handleExerciseInputChange(event){
      this.setState({
        regime:{
          label:this.state.regime.label,
          name:event.target.value,
          id:this.state.regime.id
        }
      })
    }
    handleInput(event){
      event.preventDefault();
      putExercise(this.state.regime.label,this.state.regime.name,this.state.regime.id)
      .then(() => {
        this.props.update();

      })
      .then(() => {
        this.setState({
          edit:!this.state.edit
        });
      });
    }
    handleDelete(event){
      return deleteExercise(this.state.regime.id)
      .then(() => {
        this.props.update();
      })
    }
    renderPlain(){
       return (
         <div className='display-label-name-list-item'>
           <div className='row'>
             <div className="col-xs-8 display-label-name">
                 <span> {this.state.amount} </span>:<span> {this.state.name} </span>
             </div>
             <div className="col-xs-4 delete-edit-button">
                 <button className="btn btn-primary  btn-xs" onClick={this.handleDelete.bind(this)}type='button'>
                   <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                 </button>
                 <button className="btn btn-primary  btn-xs" onClick={this.onClickInput.bind(this)} type='button'>
                   <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                 </button>
             </div>
          </div>
        </div>
       )
    }

    onClickInput(){
      this.setState({
        edit:!this.state.edit
      })
    }

    renderTextArea(){
      return (
        <div className='render-text-area'>
          <form onSubmit={this.handleInput.bind(this)} className='form-inline well'>
            <div className='row'>
              <div className="col-xs-4">
                <div className='input-group'>
                  <input type='label' name='label' id='label' className='form-control input-sm' placeholder='label' value={this.state.regime.label} onChange={this.handleLabelInputChange.bind(this)}/>
                </div>
              </div>
              <div className="col-xs-4">
                <div className='input-group'>
                  <input type='exercise' name='exercise' id='exercise' className='form-control input-sm' placeholder='exercise' value={this.state.regime.name}  onChange={this.handleExerciseInputChange.bind(this)}/>
                </div>
              </div>
              <div className='col-xs-4 btn-group-no-wrap-div'>
                <button className="btn btn-primary btn-xs" type='submit'>
                  <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                </button>
                <button className="btn btn-primary btn-xs" onClick={this.onClickInput} type='button'>
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )
    }
  render(){
    return(
      <div>{this.state.edit ? this.renderTextArea() : this.renderPlain()}</div>

    )
  }
}
