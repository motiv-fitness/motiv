import React from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';
// var Infinite = require('react-infinite');
import _ from 'lodash';
import FeedItem from './FeedItem';
import {initiateFeed, updateFeed} from '../helpers/feed.js';

class Feed extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      feedItems:[],
      isInfiniteLoading: false
    };
    this.handleInfiniteLoad.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      feedItems: nextProps.feedItems || []
    });
  }

  handleInfiniteLoad() {
    if(!this.props.user.id) {
      return;
    }
    if(this.state.feedItems.length === 0) {
      return initiateFeed(this.props.user.id)
      .then((feeds) => {
        this.setState({
          feedItems: feeds
        });
      });
    }
    updateFeed(this.props.user.id)
    .then((json) => {
      this.setState({
        isInfiniteLoading: false,
        feedItems: this.state.feedItems.concat(json)
      });
    });
  }

  elementInfiniteLoad() {
    return (<img className="inf-load-loader" src="./assets/loading-more.gif" />);
  }

  render() {
    let displayFeedItems = _.map(this.state.feedItems,(status, i) => {
      return (<FeedItem key={i} {...status}/>);
    });

    if (typeof(window) == 'undefined') {
      global.window = new Object();
    }
    return (
      <div>
        <Infinite
          useWindowAsScrollContainer
          containerHeight={500}
          elementHeight={99.53}
          infiniteLoadBeginEdgeOffset={400}
          onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}>
          {displayFeedItems}
        </Infinite>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feedItems: state.feed.feedItems
  };
};

export default connect(mapStateToProps)(Feed);
