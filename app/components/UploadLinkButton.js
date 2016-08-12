import React from 'react';

class UploadLinkButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      link: '',
      onSubmit: props.onSubmit
    };
  }

  resetInput() {
    this.setState({
      link: ''
    });
  }

  handleLinkUpload(event) {
    event.preventDefault();
    if(this.state.onSubmit) {
      this.state.onSubmit(this.state.link)
      .then(function(result) {
        alert('Successfully saved link: ' + result);
        resetInput();
      })
      .catch(function(error) {
        alert('Error saving link: ' + error);
        resetInput();
      });
    } else {
      console.warn('No action set on submit.');
    }
  }

  handleLinkOnChange(event) {
    this.setState({
      link: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLinkUpload.bind(this)}>
          <span>Upload url: </span>
          <input name='url'
                 type='url'
                 placeholder='image / video url'
                 onChange={this.handleLinkOnChange.bind(this)}
                 value={this.state.link}></input>
          <button type='submit'>Upload</button>
        </form>
      </div>
    );
  }
}

export default UploadLinkButton;