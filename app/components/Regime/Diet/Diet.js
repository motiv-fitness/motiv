import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import RegimeDiet from './RegimeDiet.js'

class Diet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      food:[]
    };
  }
  componentDidMount() {
    this.setState({
      food: this.props.food
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      food: nextProps.food
    })
  }
  render() {
    const foodDOM = _.map(this.state.food, (food,index) => {
      return (<RegimeDiet key={index} {...food}/>);
    });

    return (
      <div>
        <h1>This is Information for the dummy data from food</h1>
        <div>
          {foodDOM}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    food: state.regime.food
  };
};

export default connect(mapStateToProps)(Diet);
