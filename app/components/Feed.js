import React from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';
// var Infinite = require('react-infinite');
import _ from 'lodash';
import FeedItem from './FeedItem';
import {updateFeed} from '../helpers/feed.js';

class Feed extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      feedItems:[],
      isInfiniteLoading: false
    };
    this.handleInfiniteLoad.bind(this);
  }

  componentDidMount() {

    this.setState({
      feedItems: this.props.feedItems
    });
  }

  componentWillReceiveProps(nextProps) {


    this.setState({
      feedItems: nextProps.feedItems
    })
  }

  handleInfiniteLoad() {

    let that = this;
    updateFeed()
      .then((json) => {
        console.log("this is the json data", json)
        this.setState({
          isInfiniteLoading: false,
          feedItems: this.state.feedItems.concat(json)
        })
      })
    
  }

  elementInfiniteLoad() {
    return (<div>
            Loading...
        </div>);
  }


  render() {
    let displayFeedItems = _.map(this.state.feedItems,(status, i) => {
        return (<FeedItem key={i} {...status}/>);
    });

    if (typeof(window) == 'undefined'){
        global.window = new Object();
    }
    return (
      <div className="container container-infinite">
        <Infinite
          useWindowAsScrollContainer
          containerHeight={500}
          elementHeight={99.53}
          infiniteLoadBeginEdgeOffset={400}
          onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}

          >
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
