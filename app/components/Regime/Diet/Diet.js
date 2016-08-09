import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import RegimeDiet from './RegimeDiet.js';
import { putDiet } from '../../../actions/regime';

class Diet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dietInput:'',
      foodInput:'',
      foods:'',
      diet:''
    };
  }
  componentDidMount() {
    this.setState({
      foods: this.props.foods,
      diet: this.props.diet
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      foods: nextProps.foods,
      diet: nextProps.diet
    })
  }

  handleFoodInputChange(event){
    this.setState({foodInput:event.target.value});
  }

  handleDietInputChange(event){
    this.setState({dietInput:event.target.value});
  }

  handleInput(event){
    event.preventDefault();
    this.props.dispatch(putDiet(this.state.dietInput, this.state.foodInput));
  }


  render() {
    // const foodDOM = _.map(this.state.food, (food,index) => {
    //   return (<RegimeDiet key={index} {...food}/>);
    // });

    return (
      <div className="container">
        <form onSubmit={this.handleInput.bind(this)}>
          <h4>regime</h4>
          <label htmlFor='diet'>Day</label>
          <input type='diet' name='diet' id='diet' placeholder='Day' value={this.state.diet} onChange={this.handleDietInputChange.bind(this)}/>
          <label htmlFor='foods'>foods</label>
          <input type='foods' name='foods' id='foods' placeholder='foods' value={this.state.diet} onChange={this.handleFoodInputChange.bind(this)}/>
          <button type='submit'>submit</button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    foods: state.regime.food
  };
};

export default connect(mapStateToProps)(Diet);
