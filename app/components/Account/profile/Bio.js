import React from 'react';
import Image from './Image';

const Bio = ({name, picture, headerPicture}) => {
  const pictureDom = picture 
    ? (<Image src={picture} />)
    : undefined;
  const nameDom = name
    ? (<div><h3>{name}</h3></div>)
    : undefined;
  const headerUrl = headerPicture
    ? headerPicture
    : 'http://feelgrafix.com/data/landscape/landscape-1.jpg';

  return (
    <div className="card">
      <div className="card-image">
        <img className='header-img' src={headerUrl} />
      </div>
      <div className="card-content bio-div-parent">
        {pictureDom}
        <div className="bio-div">
          {nameDom}
        </div>
      </div>
    </div>
  );
};

export default Bio;