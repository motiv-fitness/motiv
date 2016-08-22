import React from 'react';
import moment from 'moment';

const FeedItem = ({content}) => {
  return (
    <div className="card">
      <div className="card-content">      
        <div className="right-corner-time"><h4> {moment().format()}</h4></div>
        <h1> {content} </h1>
      </div>
    </div>
  )
}

export default FeedItem;