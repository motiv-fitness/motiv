import React from 'react';

const FeedItem = (props) => {

  return (
      <div>        
        <h3> {props.name} </h3>
        <h4> {props.time}</h4>
        <p> {props.content}</p>
      </div>
  )
}

export default FeedItem;