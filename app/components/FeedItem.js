import React from 'react';

const FeedItem = (props) => {

  return (
      <div>        
        <h1> {props.data} </h1>

        <h3> Justin Chen </h3>
        <h4> 3:45 PM 08/05/2016 </h4>
        <p> check out these status updates</p>

      </div>
  )
}


export default FeedItem;
