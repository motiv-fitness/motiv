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
      putExercise(this.state.regime.label,this.state.regime.name,this.state.regime.id)
      .then(() => {
        this.setState({
          labelInput: '',
          exerciseInput: ''
        });
      });
    }

    renderPlain(){
       return (
         <div>
              <span> {this.state.regime.label} </span>:<span> {this.state.regime.name} </span>
               <button onClick={deleteExercise(this.state.regime.id)}>delete</button>
               <button onClick={this.onClickInput}>edit</button>
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
        <div>
          <form onSubmit={this.handleInput.bind(this)}>
            <label htmlFor='Label'>Label</label>
            <input type='Label' name='Label' id='Label' placeholder='Label' value={this.state.regime.label} onChange={this.handleLabelInputChange.bind(this)}/>
            <label htmlFor='exercise'>Amount Needed</label>
            <input type='exercise' name='exercise' id='exercise' placeholder='exercise' value={this.state.regime.name}  onChange={this.handleExerciseInputChange.bind(this)}/>
            <button type='submit'>submit</button>
            <button onClick={this.onClickInput} type='button'>cancel</button>
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
