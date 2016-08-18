import React from 'react';
import {deleteDiet} from '../../../helpers/regime';
import { putDiet } from '../../../helpers/regime';

export default class DietSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      edit:false,
      dietRegime:{
        name:props.name,
        label:props.label,
        id:props.id,
        type:'Diet'
      }
    }
    this.onClickInput = this.onClickInput.bind(this);
  };
    handleLabelInputChange(event){
      this.setState({
        dietRegime:{
          name:this.state.dietRegime.name,
          label:event.target.value,
          id:this.state.dietRegime.id
        }
      })
    }

    handleFoodInputChange(event){
      this.setState({
        dietRegime:{
          name:event.target.value,
          label:this.state.dietRegime.label,
          id:this.state.dietRegime.id
        }
      })
    }
    handleInput(event){
      putDiet(this.state.dietRegime.label, this.state.dietRegime.name,this.state.dietRegime.id)
    }
    onClickInput(){
      this.setState({
        edit:!this.state.edit
      })
    }
    RenderPlain(){
       return (
         <div>
              <span> {this.state.dietRegime.label} </span>:<span> {this.state.dietRegime.name} </span>
              <button  onClick={deleteDiet(this.state.dietRegime.id)}type='submit'>delete</button>
              <button onClick={this.onClickInput} type='button'>edit</button>
        </div>
       )
    }

    RenderTextArea(){
      return (
        <div>
          <form onSubmit={this.handleInput.bind(this)}>
            <label htmlFor='label'>Name of Label</label>
            <input type='label' name='label' id='label' placeholder='label' value={this.state.dietRegime.label} onChange={this.handleLabelInputChange.bind(this)}/>
            <label htmlFor='food'>Food</label>
            <input type='food' name='food' id='food' placeholder='food' value={this.state.dietRegime.name}  onChange={this.handleFoodInputChange.bind(this)}/>
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
