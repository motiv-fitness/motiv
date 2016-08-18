import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import DietSpan from './RegimeDiet.js';
import { postDiet, displayDiet } from '../../../helpers/regime';
import ReactList from 'react-list';

class Diet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dietRegime: {
      name:'',
      label:'',
      type:'diet'
    },
    diets:[]
    }
  }
  componentDidMount() {
    displayDiet()
      .then((diets) => {
        this.setState({
          diets: diets
        });
      });
  }

  handleLabelInputChange(event){
    this.setState({dietRegime:{
    name:this.state.dietRegime.name,
    label:event.target.value,
    type:this.state.dietRegime.type
    }
  });
  }

  handleNameInputChange(event){
    this.setState({dietRegime:{
      name:event.target.value,
      label:this.state.dietRegime.label,
      type:this.state.dietRegime.type
    }
  });
  }

  handleInput(event){
    postDiet(this.state.dietRegime.name ,this.state.dietRegime.label)
      .then(() => {
        this.setState({
          dietRegime: {
            label: '',
            name: '',
            type: this.state.dietRegime.type
          }
        })
      });
  }

  dietRegime(index){
    return <DietSpan key={index} {...this.state.diets[index]}/>
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleInput.bind(this)}>
          <h4>Diet</h4>
          <label htmlFor='label'>Diet Label</label>
          <input type='label' name='label' id='label' placeholder='Diet Label' value={this.state.dietRegime.label} onChange={this.handleLabelInputChange.bind(this)}/>
          <label htmlFor='foods'>Name of food</label>
          <input type='foods' name='foods' id='foods' placeholder='foods' value={this.state.dietRegime.name} onChange={this.handleNameInputChange.bind(this)}/>
          <button type='submit'>submit</button>
        </form>
        <div style={{overflow: 'auto', maxHeight: 400}}>
            <ReactList
            itemRenderer={this.dietRegime.bind(this)}
              length={this.state.diets.length}
              type='uniform'
              />
        </div>
      </div>
    );
  }
}
