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

  componentDidMount() {
    this.updateDisplayDiet()
  }
  updateDisplayDiet() {
    return displayDiet()
    .then((diets) => {
      console.log(diets,'this is diets from diet')
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
