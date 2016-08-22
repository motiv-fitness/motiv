import React from 'react';
import _ from 'lodash';
import ReactList from 'react-list';

export default class EditableLabelName extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      row: {
        label: '',
        name: '',
        type: this.props.type
      },
      showInput: false
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
      this.props.update();
    })
    .then(() => {
      this.setState({
        row: {
          label:'',
          name:''
        },
        showInput: false
      });
    });
  }

  toggleInput() {
    this.setState({
      showInput: !this.state.showInput
    });
  }

  render() {
    const inputDiv = this.state.showInput
      ? (
        <div>
          <form onSubmit={this.handleInput.bind(this)} className='form-inline well'>
          <div className='input-group'>
            <input style={{weight: '30px'}} type='label'  className='form-control' name='label' id='label' placeholder={this.props.label} value={this.state.row.label} onChange={this.handleLabelInput.bind(this)}/>
            <input style={{weight:'30px'}} type='name' className='form-control' name='name' id='name' placeholder={this.props.name} value={this.state.row.name} onChange={this.handleNameInput.bind(this)}/>
          </div>
            <button className="btn btn-primary  btn-xs hide-inputfield" type='submit'>Submit</button>
          </form>
        </div>
      ) : undefined;
    return (
      <div>
        <button className="btn btn-primary btn-xs show-input" type='button' onClick={this.toggleInput.bind(this)}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
        {inputDiv}
      </div>
    );
  }
}
