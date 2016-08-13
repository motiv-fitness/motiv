import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import {Circle} from 'rc-progress';

const divStyle = {
  height: '30px',
  width: '30px',
  display: 'inline-block'
};

class UploadButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      percent: 0,
      status: '',
      accept: props.fileType + '/*',
      isDisplayProgress: false,
      onFinish: props.onFinish
    };
  }

  onUploadProgress(percent, status, file) {
    this.setState({
      percent: percent,
      status: status,
      isDisplayProgress: true
    });
  }

  onUploadError(status, file) {
    this.resetInput();
    alert('Uploading [' + file.name + '] failed!');
  }

  onUploadFinish(result, file) {
    this.resetInput();
    if(this.state.onFinish) {
      this.state.onFinish(result.imgInfo);
    } else {
      console.warn('No action set on finish.');
    }
    alert('Uploaded [' + file.name + '] successfully!'); 
  }

  resetInput() {
    this.setState({
      percent: 0,
      status: '',
      isDisplayProgress: false
    });
    document.getElementsByClassName('uploadButtonWrapper')[0]
      .getElementsByTagName('input')[0].value = '';
  }

  render() {
    const progressDisplay = this.state.isDisplayProgress
      ? (
          <div style={divStyle}>
            <Circle percent={this.state.percent} strokeWidth={10} />
          </div>
        )
      : (
          <span>Upload {this.props.fileType}</span>
        );
      
    return (    
      <div className='uploadButtonWrapper'>
        <label className="btn btn-primary btn-file">
          {progressDisplay}
          <ReactS3Uploader
            signingUrl='/api/aws/s3/sign'
            accept={this.state.accept}
            onProgress={this.onUploadProgress.bind(this)}
            onError={this.onUploadError.bind(this)}
            onFinish={this.onUploadFinish.bind(this)}
            signingUrlHeaders={{}}
            signingUrlQueryParams={{}}
            uploadRequestHeaders={{}}
            contentDisposition="auto" />
        </label>
      </div>
    );
  }
}

export default UploadButton;