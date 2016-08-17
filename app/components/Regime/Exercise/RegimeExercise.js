import React from 'react';
import { deleteExercise } from '../../../actions/regime';
import { connect } from 'react-redux';
import { putExercise } from '../../../actions/regime';
class ExerciseSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      edit:false,
      LabelInput:'',
      ExerciseInput:'',
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
        LabelInput:this.props.LabelInput,
        ExerciseInput:this.props.LabelInput,
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
      this.props.dispatch(putExercise(this.state.regime.label,this.state.regime.name,this.state.regime.id));
      this.setState({
        LabelInput:'',
        ExerciseInput:''
      })
    }

    RenderPlain(){
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

    RenderTextArea(){
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
      <div>{this.state.edit ? this.RenderTextArea() : this.RenderPlain()}</div>

    )
  }
}
export default connect (null)(ExerciseSpan)
