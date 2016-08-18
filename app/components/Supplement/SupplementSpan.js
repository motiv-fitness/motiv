import React from 'react';
import {deleteSupplement} from '../../helpers/supplements';
import { putSupplement } from '../../helpers/supplements';


export default class SupplementSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      edit:true,
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

  handleInput(event){
    putSupplement(this.state.name,this.state.amount,this.state.id)
  }

  onClickInput(){
    this.setState({
      edit: !this.state.edit
    })
  }
    renderPlain(){
       return (
         <div>
              <span> {this.state.name} </span>:<span> {this.state.amount} </span>
              <button onClick={deleteSupplement(this.state.id)}>delete</button>
              <button onClick={this.onClickInput}>edit</button>
           </div>
       )
    }

    renderTextArea(){
      return (
        <div>
          <form onSubmit={this.handleInput.bind(this)}>
            <label htmlFor='supplement'>Name of Supplement</label>
            <input type='supplement' name='supplement' id='supplement' placeholder='supplement' value={this.state.name} onChange={this.handleSupplementInputChange.bind(this)}/>
            <label htmlFor='amounts'>Amount Needed</label>
            <input type='amounts' name='amounts' id='amounts' placeholder='amount' value={this.state.amount}  onChange={this.handleAmountsInputChange.bind(this)}/>
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
