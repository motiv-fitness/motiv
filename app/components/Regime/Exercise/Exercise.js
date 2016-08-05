import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import RegimeExercise from './RegimeExercise';


class Diet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      diet:[]
    };
  }
  componentDidMount() {
    this.setState({
      diet: this.props.diet
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      diet: nextProps.diet
    })
  }
  render() {
    const regimesDOM = _.map(this.state.diet, (regime, index) => {
      return (<RegimeExercise key={index} {...regime}/>);
    });

    return (
      <div>
        <h1>This is Information to the regimens</h1>
        <div>
          {regimesDOM}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    diet: state.regime.exercise,
  };
};

export default connect(mapStateToProps)(Diet);
