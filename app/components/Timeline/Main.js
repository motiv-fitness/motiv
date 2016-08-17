import React from 'react';
import { connect } from 'react-redux'
import Block from './Block';
import BlockType from './BlockType';
import AddProgressModal from './AddProgressModal';
import moment from 'moment';
import _ from 'lodash';
import InfiniteLoad from '../../helpers/InfiniteLoad';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      timeline: [],
      reset: false
    };
    this.updateTimeline = this.updateTimeline.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
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

  updateTimeline(reset, page, onFinish) {
    return fetch('/users/' + this.props.user.id + '/timeline/' + (reset ? -1 : page), {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          this.setState({
            timeline: reset ? json.data : this.state.timeline.concat(json.data),
            reset: reset
          });
          if(onFinish) {
            onFinish(json);
          }
        });
      } else {
        return response.json().then((json) => {
          return response.statusText;
        });
      }
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const timeline = _.map(this.state.timeline, (block, index) => {
      const type = this.getBlockType(block.contentType);
      return (
        <Block index={index} key={index} blockType={type} {...block} />
      );
    });

    return (
      <div>
        <div className="timeline-container">
          <section id="cd-timeline" className="cd-container">
            <div className="cd-timeline-block">
              <div className="cd-timeline-img cd-add-progress cd-add-progress-button"
                   onClick={this.openModal.bind(this)}>
                <img src="../../assets/white-plus.png" alt="Add" />
              </div>
              <div className="add-button-margin-bottom"></div>
            </div>
            <InfiniteLoad update={this.updateTimeline} reset={this.state.reset}>
              {timeline}
            </InfiniteLoad>
          </section>
        </div>
        <AddProgressModal modalIsOpen={this.state.modalIsOpen}
                          closeModal={this.closeModal.bind(this)}
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