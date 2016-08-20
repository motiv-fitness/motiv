import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import SupplementSpan from './SupplementSpan';
import { postSupplement } from '../../actions/supplements';
import ReactList from 'react-list';

class Supplements extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      supplementInput: '',
      amountsInput:'',
      supplements: []
    };
  }
  componentDidMount() {
    this.setState({
      supplementInput: this.props.supplementInput,
      amountsInput:this.props.amountsInput,
      supplements:this.props.supplements || []
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      supplementInput:nextProps.supplementInput,
      amountsInput:nextProps.amountsInput,
      supplements:nextProps.supplements || []
    });
  }




  //
  //   <div>
  //       {supplementsDOM}
  //   </div>
  // </div>
  handleSupplementInputChange(event) {
    this.setState({supplementInput: event.target.value});
  }
  handleAmountsInputChange(event) {
    this.setState({amountsInput:event.target.value});
  }

  handleInput(event){

    this.props.dispatch(postSupplement(this.state.supplementInput,this.state.amountsInput))
    this.setState({
      amountsInput:'',
      supplementInput:'',
      supplements:[]
    });
  }

supplementItem(index) {
  return <SupplementSpan key={index} {...this.state.supplements[index]}/>;
}

  render(){
    return(
      <div>
        <form onSubmit={this.handleInput.bind(this)}>
          <label htmlFor='supplement'>Name of Supplement</label>
          <input type='supplement' name='supplement' id='supplement' placeholder='supplement' value={this.state.supplementsInput} onChange={this.handleSupplementInputChange.bind(this)}/>
          <label htmlFor='amounts'>Amount Needed</label>
          <input type='amounts' name='amounts' id='amounts' placeholder='amount' value={this.state.amountInput}  onChange={this.handleAmountsInputChange.bind(this)}/>
          <button type='submit'>submit</button>
        </form>
        <div style={{overflow: 'auto', maxHeight: 400}}>
            <ReactList
            itemRenderer={this.supplementItem.bind(this)}
              length={this.state.supplements.length}
              type='uniform'
              />
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
