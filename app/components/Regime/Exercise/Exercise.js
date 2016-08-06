import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import RegimeExercise from './RegimeExercise';
import { putExercise } from '../../../actions/regime';

class Diet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      exerciseInput:'',
      nameInput:'',
      exercise:'',
      name:''
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.name,
      exercise: this.props.exercise
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      exercise: nextProps.exercise
    })
  }

  handleExerciseInput(event){
    this.setState({exerciseInput:event.target.value});
  }

  handleNameInput(event){
    this.setState({nameInput:event.target.value});
  }

  handleInput(event){
    event.preventDefault();
    this.props.dispatch(putExercise(this.state.nameInput, this.state.exerciseInput));
  }

  render() {
    // const regimesDOM = _.map(this.state.name, (regime, index) => {
    //   return (<RegimeExercise key={index} {...regime}/>);
    // });

    return (
      <div className="container">
        <form onSubmit={this.handleInput.bind(this)}>
          <h4>regime</h4>
          <label htmlFor='name'>name</label>
          <input type='name' name='name' id='name' placeholder='name' value={this.state.name} onChange={this.handleNameInput.bind(this)}/>
          <label htmlFor='exercise'>exercise</label>
          <input type='exercise' name='exercise' id='exercise' placeholder='exercise' value={this.state.exercise} onChange={this.handleExerciseInput.bind(this)}/>
          <button type='submit'>submit</button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    names: state.regime.exercise,
  };
};

export default connect(mapStateToProps)(Diet);
