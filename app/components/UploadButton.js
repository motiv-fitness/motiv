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
      isDisplayProgress: false
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
    this.setState({
      percent: 0,
      status: '',
      isDisplayProgress: false
    });
    alert('Uploading [' + file.name + '] failed!');
  }

  onUploadFinish(signResult, file) {
    this.setState({
      percent: 0,
      status: '',
      isDisplayProgress: false
    });
    alert('Uploaded [' + file.name + '] successfully!');
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
      : undefined;
    return (    
      <div className='uploadButtonWrapper'>
        <span>Upload progress image: </span>
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
        {progressDisplay}
      </div>
    );
  }
}

export default UploadButton;