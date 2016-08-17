import React from 'react';
import {deleteSupplement} from '../../actions/supplements';
import { putSupplement } from '../../actions/supplements';
import { connect } from 'react-redux';


class SupplementSpan extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      edit:true,
      supplementInput: '',
      amountsInput:'',
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
    this.props.dispatch(putSupplement(this.state.name,this.state.amount,this.state.id))
    this.setState({
      amountsInput:'',
      supplementInput:'',
      supplements:[]
    });
  }

    onClickInput(){
      console.log('this is value')
      this.setState({
        edit: !this.state.edit
      })
    }
    RenderPlain(){
       return (
         <div>
              <span> {this.state.name} </span>:<span> {this.state.amount} </span>
              <button onClick={deleteSupplement(this.state.id)}>delete</button>
              <button onClick={this.onClickInput}>edit</button>
           </div>
       )
    }

    RenderTextArea(){
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
      <div>{this.state.edit ? this.RenderTextArea() : this.RenderPlain()}</div>

    )
  }
}
export default connect (null)(SupplementSpan)
