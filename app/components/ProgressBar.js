import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Line} from 'rc-progress';
const SPACE = "............";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: []
    };
  }

  componentDidMount() {
    this.setState({
      progress: this.props.progress
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      progress: nextProps.progress
    });
  }

  renderProgressBar() {
    if(this.state.progress && Array.isArray(this.state.progress)) {
      return _.map(this.state.progress, (goal, index) => {
        return (
          <div key={index}>
            <Line percent={(goal.current / goal.target) * 100} strokeWidth={2} />
            <div>
              <strong>{goal.name} goal:</strong> {goal.target} {SPACE}
              <strong>{goal.name} now:</strong> {goal.current} {SPACE}
              <strong>Line Progress:</strong> {(goal.current / goal.target) * 100}%
            </div><br/>
          </div>
       );
     });
    } else {
      return undefined;
    }
  }

  render() {
    const progressBar = this.renderProgressBar();
      return (
        <div>
          {progressBar}
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    progress: state.goals.progress
  };
}

export default connect(mapStateToProps)(ProgressBar);
