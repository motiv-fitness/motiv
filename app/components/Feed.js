import React from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';
// var Infinite = require('react-infinite');
import _ from 'lodash';
import FeedItem from './FeedItem';
import {updateFeed} from '../actions/feed';

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
    console.log("state after componentdidmount", this.state)
  }

  componentWillReceiveProps(nextProps) {


    this.setState({
      feedItems: nextProps.feedItems
    })
  }

  handleInfiniteLoad() {

    var that = this;

    var resObj = [

    ];
    console.log("we here in the handle infinite")

    fetch('/api/feed/moar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin'
        }).then((response) => {
          console.log("we responded", response)
          if (response.ok) {
            return response.json().then((json) => {
              this.setState({
                isInfiniteLoading: false,
                feedItems: that.state.feedItems.concat(json)
              })
            });
          } else {
            return response.json().then((json) => {
              this.setState({
                isInfiniteLoading: false
              })
              console.log("error infinite loading,", json)

            });
          }
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

    return (
      <div className="container">
        <Infinite
          containerHeight={500}
          elementHeight={99.53}
          infiniteLoadBeginEdgeOffset={400}
          onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}

          >
            {displayFeedItems}
        </Infinite>
        <Infinite
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
