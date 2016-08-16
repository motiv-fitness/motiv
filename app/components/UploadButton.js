import React from 'react';

class UploadButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      onFinish: props.onFinish
    };
    this.onUploadFinish = this.onUploadFinish.bind(this);
  }

  componentDidMount() {
    document.getElementById("upload_widget_opener").addEventListener("click", () => {
      global.window.cloudinary.openUploadWidget({ 
          cloud_name: 'dennyjun', 
          upload_preset: 'dz2zboxf'
        }, 
        (error, result) => { 
          this.onUploadFinish(error, result) 
        }
      );
    }, false);
  }

  onUploadFinish(error, result) {
    if(error) {
      return;
    }
    if(this.state.onFinish) {
      this.state.onFinish(result);
    } else {
      console.warn('No action set on finish.');
    }
  }

  render() {
    return (    
      <button className="btn btn-primary" 
              id="upload_widget_opener">Upload {this.props.fileType}</button>
    );
  }
}

export default UploadButton;