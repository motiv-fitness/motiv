import React from 'react';
import moment from 'moment';

const Block = ({blockType, link, dateTime, weight, current, name, description, measurement, progressType}) => {

  const media = blockType.className === 'cd-location'
    ? undefined
    : blockType.className === 'cd-picture'
    ? (<img src={link} />)
    : (<iframe width="400" height="240" src={link} frameBorder="0" allowFullScreen></iframe>);

  const date = moment(dateTime).format('MM/DD/YYYY hh:mm A');

  return (
    <div className="cd-timeline-block">
      <div className={"cd-timeline-img " + blockType.className}>
        <img src={blockType.imgSrc} alt={blockType.imgAlt} />
      </div> 
      <div className="cd-timeline-content">
        {media}
        <span className="cd-date">{date}</span>
      </div> 
    </div>
  );
};

export default Block;