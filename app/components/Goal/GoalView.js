import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {goal, getGoal, putGoal, deleteGoal, displayGoal} from '../../actions/goal.js';
import ReactList from 'react-list';
import GoalSpan from './GoalSpan';
import AddGoal from './GoalAdd';

import {Line} from 'rc-progress';
const SPACE = "..............";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
      goalId: '',
      target: 0,
      measurementValue: 'Lbs',
      name: '',
      description: '',
      typeValue: 'Exercise',
      current: 0
    };
  }

  componentDidMount() {
    this.setState({
      goalId: this.props.goal_id,
      target: this.props.target,
      measurementValue: this.props.measurement,
      name: this.props.name,
      description: this.props.description,
      typeValue: this.props.type,
      current: this.props.current,
      progress:this.props.progress || []
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      goalId: nextProps.goal_id,
      target: nextProps.target,
      measurementValue: nextProps.measurement,
      name: nextProps.name,
      description: nextProps.description,
      typeValue: nextProps.type,
      current: nextProps.current,
      progress:nextProps.progress || []
    });
  }

goalItem(index) {
  return <GoalSpan key={index} {...this.state.progress[index]} />;
}

render() {
  return (
    <div>
    <AddGoal />
      <div style={{overflow: 'auto', maxHeight: 400}}>
          <ReactList
          itemRenderer={this.goalItem.bind(this)}
            length={this.state.progress.length}
            type='uniform'
            />
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    progress: state.goals.progress,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(ProgressBar);
