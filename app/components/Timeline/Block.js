import React from 'react';
import moment from 'moment';

const Block = ({blockType, link, dateTime, weight, current, name, description, measurement, progressType, index}) => {

  const media = blockType.className === 'cd-location'
    ? undefined
    : blockType.className === 'cd-picture'
    ? (<img src={link} />)
    : (<iframe width="100%" height="300" src={link} frameBorder="0" allowFullScreen></iframe>);

  const date = moment(dateTime).format('MM/DD/YYYY hh:mm A');

  return (
    <div id={'timeline-block-' + index} className="cd-timeline-block">
      <div className={"cd-timeline-img " + blockType.className}>
        <img src={blockType.imgSrc} alt={blockType.imgAlt} />
      </div> 
      <div className="cd-timeline-content">
        {media}
        <span className="cd-date">{date}</span>
        <ul className="timeline-data-list list-group">
          <li className="list-group-item">
            Name:
            <span className="badge">{name}</span>
          </li>
          <li className="list-group-item">
            Type:
            <span className="badge">{progressType}</span>
          </li>
          <li className="list-group-item">
            Description:
            <span className="badge">{description}</span>
          </li>
          <li className="list-group-item">
            Weight:
            <span className="badge">{weight}</span>
          </li>
          <li className="list-group-item">
            Current progress:
            <span className="badge">{current} {measurement}</span>
          </li>
        </ul>
      </div> 
    </div>
  );
};

export default Block;