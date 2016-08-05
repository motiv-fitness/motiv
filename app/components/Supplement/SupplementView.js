import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Supplement from './SupplementSpan';

class Supplements extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      supplement:[]
    };
  }
  componentDidMount() {
    this.setState({
      supplement: this.props.supplement
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      supplement:nextProps.supplement
    });
  }
  render(){
    const supplementsDOM = _.map(this.state.supplement, (supplement,index) => {
      return (<Supplement key ={index} {...supplement}/>);
    });
    return(
      <div>
        <h1>This is the supplement</h1>
        <div>
        {supplementsDOM}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    supplement: state.supplement.supplementaryAction
  };
};

export default connect(mapStateToProps)(Supplements);
