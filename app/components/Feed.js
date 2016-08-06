import React from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';
// var Infinite = require('react-infinite');
import _ from 'lodash';
import FeedItem from './FeedItem'

class Feed extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      feedItems:[]
    };
  }
  componentDidMount() {
    console.log("component mounted,", this.props.feedItems)
    this.setState({
      feedItems: this.props.feedItems
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("will receive props called, nextProps:", nextProps)
    this.setState({
      feedItems: nextProps.feedItems
    })
  }
  render() {

    console.log("rendering feed component")
    console.log("state before rendering", this.state)

    const displayFeedItems = _.map(this.state.feedItems,(status, i) => {
        return (<FeedItem key={i} {...status}/>);
    });
    
    // const displayFeedItems = [];
    // for (let i = 0; i <= 40; i++) {
    //     displayFeedItems.push(<FeedItem key={i} value={i} />)
    // }
    return (
      <div className="container">
        <Infinite containerHeight={500} elementHeight={200}>
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
