import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import DietSpan from './RegimeDiet.js';
import { postDiet } from '../../../actions/regime';
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
    this.setState({
      diets:this.props.diets || []
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      diets:nextProps.diets || []
    })
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
    this.props.dispatch(postDiet(this.state.dietRegime.name ,this.state.dietRegime.label));
    this.setState({
      dietRegime:{
        label:'',
        name:'',
        type:this.state.dietRegime.type
      }
    })
  }
  DietRegime(index){
    return <DietSpan key={index} {...this.state.diets[index]}/>
  }

  render() {
    return (
      <div className="container">
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
            itemRenderer={this.DietRegime.bind(this)}
              length={this.state.diets.length}
              type='uniform'
              />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    diets: state.regime.diets
  };
};

export default connect(mapStateToProps)(Diet);
