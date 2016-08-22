import React from 'react';
import _ from 'lodash';
import ExerciseSpan from './RegimeExercise';
import { postExercise, displayExercise } from '../../../helpers/regime';
import ReactList from 'react-list';
import EditableLabelName from '../../EditableLabelName';

export default class Exercise extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      exercises: []
    };
  }
  componentDidMount() {
    this.updateDisplayExercise()
  }

  updateDisplayExercise() {
    return displayExercise()
    .then((exercises) => {
      this.setState({
        exercises: exercises
      });
    })
  }


  render() {
    const list = _.map(this.state.exercises, (exercise) => {
      return <ExerciseSpan key={exercise.id} update={this.updateDisplayExercise.bind(this)} {...exercise}/>;
    });
    return (
      <div>
        <EditableLabelName type='exercise' label='exercise' name='typeOfExercise'
          onAddData={postExercise}
          update={this.updateDisplayExercise.bind(this)}/>
        {list}
      </div>
    );
  }
}
