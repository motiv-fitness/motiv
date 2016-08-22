import React from 'react';
import {deleteSupplement} from '../../helpers/supplements';
import { putSupplement } from '../../helpers/supplements';


export default class SupplementSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      edit:false,
      name: props.name,
      amount: props.amount,
      id: props.id
    }
    this.onClickInput = this.onClickInput.bind(this)
  };
  componentDidMount() {
    this.setState({
      edit:this.props.edit,
      supplementInput: this.props.supplementInput,
      amountsInput:this.props.amountsInput
    })
  }

  handleSupplementInputChange(event) {
    this.setState({name: event.target.value,
                  amount:this.state.amount,
                  id:this.state.id});
  }
  handleAmountsInputChange(event) {
    this.setState({amount:event.target.value,
                  name:this.state.name,
                  id:this.state.id});
  }
  handleDeleteInput(event){
      return deleteSupplement(this.state.id)
        .then(() =>{
          this.props.update()
        })

  }

  handleInput(event){
    event.preventDefault();
    putSupplement(this.state.name,this.state.amount,this.state.id)
    .then(() => {
      this.props.update();
    })
    .then(() => {
      this.setState({
        edit:!this.state.edit
      })
    })
  }

  onClickInput(){
    this.setState({
      edit: !this.state.edit
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
                 <button className="btn btn-primary  btn-xs" onClick={this.handleDeleteInput.bind(this)}type='button'>
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

    renderTextArea(){
      return (
        <div className='render-text-area'>
          <form onSubmit={this.handleInput.bind(this)} className='form-inline well'>
            <div className='row'>
              <div className="col-xs-4">
                <div className='input-group'>
                  <input type='supplement' name='supplement' id='supplement' className='form-control input-sm' placeholder='supplement' value={this.state.amount} onChange={this.handleAmountsInputChange.bind(this)}/>
                </div>
              </div>
              <div className="col-xs-4">
                <div className='input-group'>
                  <input type='amounts' name='amounts' id='amounts' className='form-control input-sm' placeholder='amounts' value={this.state.name}  onChange={this.handleSupplementInputChange.bind(this)}/>
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
