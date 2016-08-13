import React from 'react';
import Modal from 'react-modal';
import UploadButton from '../UploadButton';
import UploadLinkButton from '../UploadLinkButton';
import {uploadProgressVideoLink, uploadProgressImageLink} from '../../helpers/upload';
import moment from 'moment';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0px',
    maxWidth              : '50%'
  }
};

export default class AddProgressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: props.modalIsOpen || false,
      dateTime: moment().format('YYYY-MM-DDThh:mm'),
      weight: 0,
      current: 0,
      name: '',
      description: '',
      measurement: '',
      progressType: 'exercise'
    };

    this.resetForm = this.resetForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalIsOpen: nextProps.modalIsOpen
    });
  }

  resetForm() {
    this.setState({
      dateTime: moment().format('YYYY-MM-DDThh:mm'),
      weight: 0,
      current: 0,
      name: '',
      description: '',
      measurement: '',
      progressType: 'exercise'
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      dateTime: moment().format('YYYY-MM-DDThh:mm'),
      weight: 0,
      current: 0,
      name: '',
      description: '',
      measurement: '',
      progressType: 'exercise'
    });
  }

  progressTypeOnClick(event) {
    event.preventDefault();
    this.setState({
      progressType: event.target.innerHTML.toLowerCase()
    });
  }

  measurementOnChange(event) {
    this.setState({
      measurement: event.target.value
    });
  }

  descriptionOnChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  nameOnChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  currentOnChange(event) {
    this.setState({
      current: event.target.value
    });
  }

  weightOnChange(event) {
    this.setState({
      weight: event.target.value
    });
  }

  dateTimeOnChange(event) {
    this.setState({
      dateTime: event.target.value
    });
  }

  uploadButtonOnFinish(imgInfo) {
    return uploadProgressImageLink({
      link: imgInfo.url,
      contentType: imgInfo.contentType,
      originalName: imgInfo.originalName,
      dateTime: this.state.dateTime,
      weight: this.state.weight,
      current: this.state.current,
      name: this.state.name,
      description: this.state.description,
      measurement: this.state.measurement,
      progressType: this.state.progressType
    })
    .then((result) => {
      this.resetForm();
      this.props.updateTimeline();
      return result;
    });
  }

  uploadLinkButtonOnSubmit(link) {
    return uploadProgressVideoLink({
      link: link,
      dateTime: this.state.dateTime,
      weight: this.state.weight,
      current: this.state.current,
      name: this.state.name,
      description: this.state.description,
      measurement: this.state.measurement,
      progressType: this.state.progressType
    })
    .then((result) => {
      this.resetForm();
      this.props.updateTimeline();
      return result;
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal.bind(this)}
        style={customStyles} >
        <div className="panel panel-primary panel-no-margin">
          <div className="panel-heading">Add Progress</div>
          <div className="panel-body">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Date / Time:</span>
                <input type="datetime-local" 
                       className="form-control"
                       onChange={this.dateTimeOnChange.bind(this)}
                       value={this.state.dateTime} 
                       aria-describedby="basic-addon1" 
                       required/>
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon2">Weight:</span>
                <input id="weight" 
                       type="number" 
                       className="form-control" 
                       placeholder="lbs/kg"
                       onChange={this.weightOnChange.bind(this)} 
                       value={this.state.weight}
                       aria-describedby="basic-addon2"
                       required/>
              </div>
              <br />
              <div>
                <div className="dropdown text-align-left">
                  <button className="btn btn-primary dropdown-toggle" 
                          type="button" id="progressTypeDropDown" 
                          data-toggle="dropdown" aria-haspopup="true" 
                          aria-expanded="true">
                    Change Type
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="progressTypeDropDown">
                    <li><a href="#" onClick={this.progressTypeOnClick.bind(this)}>Exercise</a></li>
                    <li><a href="#" onClick={this.progressTypeOnClick.bind(this)}>Diet</a></li>
                  </ul>
                  <span>Current Type:</span>
                  <span className="label label-primary">{this.state.progressType}</span>
                </div>
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">Current:</span>
                <input id="current" 
                       type="number" 
                       className="form-control" 
                       placeholder="Current"
                       onChange={this.currentOnChange.bind(this)} 
                       value={this.state.current}
                       aria-describedby="basic-addon3"
                       required/>
                <input id="measurement" 
                       type="text" 
                       className="form-control" 
                       placeholder="unit"
                       onChange={this.measurementOnChange.bind(this)} 
                       value={this.state.measurement}
                       required/>
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon4">Name:</span>
                <input id="name" 
                       type="text" 
                       className="form-control" 
                       placeholder="Name"
                       onChange={this.nameOnChange.bind(this)} 
                       value={this.state.name}
                       aria-describedby="basic-addon4"
                       required/>
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon5">Description:</span>
                <input id="description" 
                       type="text" 
                       className="form-control" 
                       placeholder="Description"
                       onChange={this.descriptionOnChange.bind(this)} 
                       value={this.state.description}
                       aria-describedby="basic-addon5"
                       required/>
              </div>
              <br />
              <ul className="nav nav-tabs">
                <li className="active"><a href="#image" data-toggle="tab">Upload Image</a></li>
                <li><a href="#video" data-toggle="tab">Upload Video</a></li>
              </ul>
              <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active in" id="image">
                  <div className="well well-lg">
                    <UploadButton fileType="image" 
                                  onFinish={this.uploadButtonOnFinish.bind(this)} />
                  </div>
                </div>
                <div className="tab-pane fade" id="video">
                  <div className="well well-lg">
                    <UploadLinkButton onSubmit={this.uploadLinkButtonOnSubmit.bind(this)} />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </Modal>
    );
  }
}
