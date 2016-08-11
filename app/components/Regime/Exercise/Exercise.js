import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import RegimeExercise from './RegimeExercise';
import { putExercise } from '../../../actions/regime';

class Exercise extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      regime: {
        label: '',
        name: '',
        type: 'exercise'
      },
      exercises: []
    };
  }
  componentDidMount() {
    this.setState({
      exercises: this.props.exercises
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      exercises: nextProps.exercises
    })
  }

  handleExerciseInput(event){
    this.setState({
      regime: {
        label: event.target.value,
        name: this.state.regime.name,
        type: this.state.regime.type
      }
    });
  }

  handleNameInput(event){
    this.setState({
      regime: {
        label: this.state.regime.label,
        name: event.target.value,
        type: this.state.regime.type
      }
    });
  }

  handleInput(event){
    event.preventDefault();
    this.props.dispatch(putExercise(this.state.regime.name, this.state.regime.label));
    this.setState({
      regime:{
      label:'',
      name:'',
      type:this.state.regime.type
    }
    })
  }

  render() {
    const regimesDOM = _.map(this.state.exercises, (regime, index) => {
      return (<RegimeExercise key={index} {...regime}/>);
    });

    return (
      <div className="container">
        <form onSubmit={this.handleInput.bind(this)}>
          <h4>regime</h4>
          <label htmlFor='label'>Regime Label</label>
          <input type='label' name='label' id='label' placeholder='label' value={this.state.regime.label} onChange={this.handleExerciseInput.bind(this)}/>
          <label htmlFor='name'>Exercise Name</label>
          <input type='name' name='name' id='name' placeholder='name' value={this.state.regime.name} onChange={this.handleNameInput.bind(this)}/>
          <button type='submit'>submit</button>
        </form>
        <div>
        {regimesDOM}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    exercises: state.regime.exercises,
  };
};

export default connect(mapStateToProps)(Exercise);
