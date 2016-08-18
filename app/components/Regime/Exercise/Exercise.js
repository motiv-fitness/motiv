import React from 'react';
import _ from 'lodash';
import ExerciseSpan from './RegimeExercise';
import { postExercise } from '../../../helpers/regime';
import ReactList from 'react-list';

export default class Exercise extends React.Component {
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
    displayExercise()
    .then((exercises) => {
      this.setState({
        exercises: exercises
      });
    });
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
    postExercise(this.state.regime.name, this.state.regime.label)
    .then(() => {
      this.setState({
        regime: {
          label: '',
          name: '',
          type: this.state.regime.type
        }
      });
    });
  }



  ExerciseRegime(index) {
    return <ExerciseSpan key={index} {...this.state.exercises[index]}/>
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleInput.bind(this)}>
          <h4>regime</h4>
          <label htmlFor='label'>Regime Label</label>
          <input type='label' name='label' id='label' placeholder='label' value={this.state.regime.label} onChange={this.handleExerciseInput.bind(this)}/>
          <label htmlFor='name'>Exercise Name</label>
          <input type='name' name='name' id='name' placeholder='name' value={this.state.regime.name} onChange={this.handleNameInput.bind(this)}/>
          <button type='submit'>submit</button>
        </form>
        <div style={{overflow: 'auto', maxHeight: 600}}>
            <ReactList
            itemRenderer={this.ExerciseRegime.bind(this)}
              length={this.state.exercises.length}
              type='uniform'
              />
        </div>
      </div>
    );
  }
}
