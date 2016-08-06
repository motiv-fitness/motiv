import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import Supplement from './SupplementSpan';
import { postSupplement } from '../../actions/supplements'

class Supplements extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      supplementInput: '',
      amountsInput:'',
      amounts: '',
      supplements: ''
    };
  }
  componentDidMount() {
    this.setState({
      supplements: this.props.supplements,
      amounts:this.props.amounts
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      supplements:nextProps.supplements,
      amounts:nextProps.amounts
    });
  }

  handleSupplementInputChange(event) {
    this.setState({ supplementInput: event.target.value});
  }
  handleAmountsInputChange(event) {
    this.setState({amountsInput:event.target.value});
  }

  handleInput(event){
    event.preventDefault();
    this.props.dispatch(postSupplement(this.state.supplementInput,this.state.amountsInput))

  }

  render(){

    console.log(this.state.supplements, "supplements outside of the dom");
    console.log(this.state.amounts, "this is inside amounts");
    const supplementsDOM = _.map(this.state.supplements, (supplement,index) => {
      console.log(supplement, "supplement");
      return (<Supplement key ={index} {...supplement}/>);
    });
      console.log(this,'this one is for refs')
      console.log(this.state.supplementInput,'This si the supplementInput')
      console.log(this.state.amountsInput,'this is the amountInput')
    return(
      <div className="container">
        <form onSubmit={this.handleInput.bind(this)}>
          <h4>Login</h4>
          <label htmlFor='supplement'>supplement</label>
          <input type='supplement' name='supplement' id='supplement'  refs='supplement' placeholder='supplement' value={this.state.supplement} onChange={this.handleSupplementInputChange.bind(this)}/>
          <label htmlFor='amount'>amounts</label>
          <input type='amounts' name='amounts' id='amounts' placeholder='amounts' value={this.state.amounts} onChange={this.handleAmountsInputChange.bind(this)}/>
          <button type='submit'>submit</button>
        </form>
        <div>
        {supplementsDOM}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    supplements: state.supplement.supplementaryAction
  };
};

export default connect(mapStateToProps)(Supplements);
