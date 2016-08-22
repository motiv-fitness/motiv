import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getGoals} from '../../helpers/goal.js';
import ReactList from 'react-list';
import GoalSpan from './GoalSpan';
import AddGoal from './GoalAdd';

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    };
  }

  componentDidMount() {
    this.updateGoals();
  }

  updateGoals() {
    return getGoals()
    .then((goals) => {
      this.setState({
        goals: goals
      });
    })
  }

  render() {
    const goalsDOM = _.map(this.state.goals, (goal, index) => {
      return <GoalSpan key={goal.goal_id} update={this.updateGoals.bind(this)} {...goal} />;
    });

    return (
      <div>
        <AddGoal update={this.updateGoals.bind(this)} />
        {goalsDOM}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

export default connect(mapStateToProps)(Goal);
