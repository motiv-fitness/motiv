import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import SupplementSpan from './SupplementSpan';
import { postSupplement, displaySupplement } from '../../helpers/supplements';
import EditableLabelName from '../EditableLabelName';
import ReactList from 'react-list';

export default class Supplements extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      supplements:[]
    };
  }
  componentDidMount() {
    this.updateDisplaySupplement()
  }

  updateDisplaySupplement() {
    return displaySupplement()
    .then((supplements) => {
      this.setState({
        supplements: supplements
      });
    })
  }


supplementItem(index) {
  return <SupplementSpan key={index} {...this.state.supplements[index]}/>;
}

  render(){
    const list = _.map(this.state.supplements, (supplement) => {
      return <SupplementSpan key={supplement.id} update={this.updateDisplaySupplement.bind(this)} {...supplement}/>;
    });
    return(
      <div className="container">
        <EditableLabelName type='supplements' label='supplement' name='amount' onAddData={postSupplement.bind(this)} update={this.updateDisplaySupplement.bind(this)} />
        {list}
      </div>
    )
  }
}
