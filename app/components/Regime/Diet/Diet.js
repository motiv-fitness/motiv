import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import DietSpan from './RegimeDiet.js';
import { postDiet, displayDiet } from '../../../helpers/regime';
import EditableLabelName from '../../EditableLabelName';
import ReactList from 'react-list';

export default class Diet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      diets:[]
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.updateDisplayDiet();
  }

  updateDisplayDiet() {
    if(!this.props.user) {
      return;
    }
    return displayDiet(this.props.user.id)
    .then((diets) => {
      this.setState({
        diets: diets
      });
    })
  }

  render() {
    const list = _.map(this.state.diets, (diet) => {
      return <DietSpan key={diet.id} update={this.updateDisplayDiet.bind(this)} {...diet}/>;
    });
    return (
      <div>
        <EditableLabelName type='diet' label='diet' name='foods' onAddData={postDiet.bind(this)} update={this.updateDisplayDiet.bind(this)} />
        <div className='display-label-name-list'>
        {list}
        </div>
      </div>
    );
  }

}
