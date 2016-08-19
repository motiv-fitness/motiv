import React from 'react';
import Modal from 'react-modal';
import UploadButton from '../UploadButton';
import UploadLinkButton from '../UploadLinkButton';
import {uploadProgressVideoLink, uploadProgressImageLink} from '../../helpers/upload';
import moment from 'moment';

export default class AddProgressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      modalIsOpen: props.modalIsOpen || false,
      dateTime: moment().format('YYYY-MM-DDTHH:mm'),
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
      modalIsOpen: nextProps.modalIsOpen,
      user: nextProps.user
    });
  }

  resetForm() {
    this.setState({
      dateTime: moment().format('YYYY-MM-DDTHH:mm'),
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
      dateTime: moment().format('YYYY-MM-DDTHH:mm'),
      weight: 0,
      current: 0,
      name: '',
      description: '',
      measurement: '',
      progressType: 'exercise'
    });
    this.props.closeModal();
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

  uploadButtonOnFinish(results) {
    var images = [];
    results.forEach((result) => {
      images.push(uploadProgressImageLink(
      this.state.user.id,
      {
        link: result.secure_url,
        contentType: result.resource_type + '/' + result.format,
        originalName: result.original_filename,
        dateTime: this.state.dateTime,
        weight: this.state.weight,
        current: this.state.current,
        name: this.state.name,
        description: this.state.description,
        measurement: this.state.measurement,
        progressType: this.state.progressType
      }));
    });
    return Promise.all(images)
    .then((result) => {
      this.props.updateTimeline(true);
      alert('Successfully uploaded files');
      this.closeModal();
      return result;
    });
  }

  uploadLinkButtonOnSubmit(link) {
    return uploadProgressVideoLink(
    this.state.user.id,
    {
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
      this.props.updateTimeline(true);
      this.closeModal();
      return result;
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        className="Modal__Bootstrap modal-dialog"
        closeTimeoutMS={150}
        onRequestClose={this.closeModal.bind(this)} >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.closeModal.bind(this)}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">Add Progress</h4>
          </div>
          <div className="modal-body">
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
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon4">Name:</span>
                <input id="name" 
                       type="text" 
                       className="form-control" 
                       placeholder="Benchpress"
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
                       placeholder="Weightlifting"
                       onChange={this.descriptionOnChange.bind(this)} 
                       value={this.state.description}
                       aria-describedby="basic-addon5"
                       required/>
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
                       placeholder="lbs"
                       onChange={this.measurementOnChange.bind(this)} 
                       value={this.state.measurement}
                       required/>
              </div>
              <br />
              <div className="input-group">
                <input type="text" className="form-control" 
                       value={this.state.progressType} disabled/>
                <div className="input-group-btn">
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Change Progress Type
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="progressTypeDropDown">
                    <li><a href="#" onClick={this.progressTypeOnClick.bind(this)}>Exercise</a></li>
                    <li><a href="#" onClick={this.progressTypeOnClick.bind(this)}>Diet</a></li>
                  </ul>
                </div>
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
