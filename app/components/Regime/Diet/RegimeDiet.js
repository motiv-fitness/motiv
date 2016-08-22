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
    handleDelete(event){
      return deleteDiet(this.state.dietRegime.id)
      .then(() => {
        return this.props.update()
      })
      .then(() => {
      })
    }


    handleInput(event){
      event.preventDefault();
      putDiet(this.state.dietRegime.name, this.state.dietRegime.label,this.state.dietRegime.id)
      .then(() => {
        this.props.update();
      })
      .then(() => {
        this.setState({
          edit:!this.state.edit
        })
      });
    }
    onClickInput(){
      this.setState({
        edit:!this.state.edit
      })
    }
    RenderPlain(){
       return (
         <div className='display-label-name-list-item'>
           <div className='row'>
             <div className="col-xs-8 display-label-name">
                 <span> {this.state.dietRegime.label} </span>:<span> {this.state.dietRegime.name} </span>
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

    RenderTextArea(){
      return (
        <div className='render-text-area'>
          <form onSubmit={this.handleInput.bind(this)} className='form-inline well'>
            <div className='row'>
              <div className="col-xs-4">
                <div className='input-group'>
                  <input type='label' name='label' id='label' className='form-control input-sm' placeholder='label' value={this.state.dietRegime.label} onChange={this.handleLabelInputChange.bind(this)} required/>
                </div>
              </div>
              <div className="col-xs-4">
                <div className='input-group'>
                  <input type='food' name='food' id='food' className='form-control input-sm' placeholder='food' value={this.state.dietRegime.name}  onChange={this.handleFoodInputChange.bind(this)} required/>
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
      <div>{this.state.edit ? this.RenderTextArea() : this.RenderPlain()}</div>

    )
  }
}
