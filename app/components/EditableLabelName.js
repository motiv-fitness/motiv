import React from 'react';
import _ from 'lodash';
import ReactList from 'react-list';

export default class Exercise extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      row: {
        label: '',
        name: '',
        type: this.props.type
      }
    };
  }

  handleLabelInput(event){
    this.setState({
      row: {
        label: event.target.value,
        name: this.state.row.name,
        type: this.state.row.type
      }
    });
  }

  handleNameInput(event){
    this.setState({
      row: {
        label: this.state.row.label,
        name: event.target.value,
        type: this.state.row.type
      }
    });
  }

  handleInput(event){
    event.preventDefault();
    this.props.onAddData(this.state.row.name, this.state.row.label)
    .then(() => {
      console.log('step 3')
      this.props.update();
    })
    .then(() => {
      this.setState({
        row: {
          label:'',
          name:''
        }
      })
    })

  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleInput.bind(this)}>
          <div className='form-group' style={{weight: '30px'}}>
          <label className='control-label' for='label'>{this.props.label}</label>
          <input style={{weight: '30px'}} type='label'  className='form-control' name='label' id='label' placeholder='label' value={this.state.row.label} onChange={this.handleLabelInput.bind(this)}/>
          </div>
          <label htmlFor='name'>{this.props.name}</label>
          <input type='name' name='name' id='name' placeholder='name' value={this.state.row.name} onChange={this.handleNameInput.bind(this)}/>
          <button className="btn btn-primary  btn-xs" type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
