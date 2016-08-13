import React from 'react';

class UploadLinkButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      link: '',
      onSubmit: props.onSubmit
    };
    this.resetInput = this.resetInput.bind(this);
  }

  resetInput() {
    this.setState({
      link: ''
    });
  }

  handleLinkUpload(event) {
    event.preventDefault();
    if(this.state.onSubmit) {
      const link = this.filterYouTubeLink(this.state.link);
      this.state.onSubmit(link)
      .then(() => {
        alert('Successfully saved link: ' + link);
        this.resetInput();
      })
      .catch((error) => {
        alert('Error saving link: ' + error);
        this.resetInput();
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

  filterYouTubeLink(link) {
    if(link.indexOf('www.youtube.com') !== -1) {
      var videoCode = link.substring(link.lastIndexOf('=') + 1, link.length);
      return 'https://www.youtube.com/embed/' + videoCode;
    } else {
      return link;
    }
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
          <button className='upload-link-submit-button' type='submit'>Upload</button>
        </form>
      </div>
    );
  }
}

export default UploadLinkButton;