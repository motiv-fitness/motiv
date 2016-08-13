import React from 'react';
import { connect } from 'react-redux'
import Block from './Block';
import BlockType from './BlockType';
import AddProgressModal from './AddProgressModal';
import moment from 'moment';
import _ from 'lodash';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      timeline: []
    };
    this.updateTimeline = this.updateTimeline.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  getBlockType(contentType) {
    if(!contentType) {
      return BlockType.LOCATION;
    } else if(contentType.startsWith('image')) {
      return BlockType.PICTURE;
    } else {
      return BlockType.VIDEO;
    }
  }

  updateTimeline() {
    return fetch('/users/' + this.props.user.id + '/timeline', {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          this.setState({
            timeline: json
          });
        });
      } else {
        return response.json().then((json) => {
          return console.error(response.statusText);
        });
      }
    });
  }

  componentDidMount() {
    this.updateTimeline();
  }

  render() {
    const timeline = _.map(this.state.timeline, (block, index) => {
      const type = this.getBlockType(block.contentType);
      return (
        <Block key={index} blockType={type} {...block} />
      );
    });

    return (
      <div>
        <div className="timeline-container">
          <section id="cd-timeline" className="cd-container">
            <div className="cd-timeline-block">
              <div className="cd-timeline-img cd-add-progress cd-add-progress-button"
                   onClick={this.openModal.bind(this)}>
                <img src="./assets/white-plus.png" alt="Add" />
              </div> 
              <div className="add-button-margin-bottom"></div>
            </div>
            {timeline}
          </section> 
        </div>
        <AddProgressModal modalIsOpen={this.state.modalIsOpen} 
                          updateTimeline={this.updateTimeline} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Timeline);