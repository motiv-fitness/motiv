import React from 'react';
import moment from 'moment';

const FeedItem = ({content, created_at}) => {
  return (
    <div className="card feed-item-div">
      <div className="card-content">      
        <div className="right-corner-time">
          <h4><span className="label label-primary">{moment(created_at).fromNow()}</span></h4>
        </div>
        <h1> {content} </h1>
      </div>
    </div>
  )
}

export default FeedItem;