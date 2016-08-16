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
      const link = this.applyFilters(this.state.link);
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

  applyFilters(link) { 
    link = this.filterTwitchLink(link);
    link = this.filterYouTubeLink(link);
    return link;
  }

  filterYouTubeLink(link) {
    if(link.indexOf('www.youtube.com') !== -1) {
      var videoCode = link.substring(link.lastIndexOf('=') + 1, link.length);
      return 'https://www.youtube.com/embed/' + videoCode;
    }
    return link;
  }

  filterTwitchLink(link) {
    if(link.indexOf('www.twitch.tv') !== -1) {
      var videoCode = link.substring(link.lastIndexOf('/') + 1, link.length);
      return 'https://player.twitch.tv/?channel=' + videoCode;
    }
    return link;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLinkUpload.bind(this)}>
          <div className="input-group">
            <span className="input-group-addon" id="upload-link-addon">Upload URL:</span>
            <input type="text" className="form-control" aria-describedby="upload-link-addon" 
                   placeholder="https://www.youtube.com/watch?v=123SOMECODE"
                   onChange={this.handleLinkOnChange.bind(this)}
                   value={this.state.link} required/>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit">Upload</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default UploadLinkButton;