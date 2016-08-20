import React from 'react';
import Image from './Image';

const Bio = ({email, name, location, website, picture}) => {
  const pictureDom = picture 
    ? (<Image src={picture} />)
    : undefined;
  const nameDom = name
    ? (<div><h3>{name}</h3></div>)
    : undefined;
  const emailDom = email
    ? (<div><span>{email}</span></div>)
    : undefined;

  return (
    <div className="card">
      <div className="card-image">
        <img className='header-img' src='http://feelgrafix.com/data/landscape/landscape-1.jpg' />
      </div>
      <div className="card-content bio-div-parent">
        {pictureDom}
        <div className="bio-div">
          {nameDom}
          {emailDom}
        </div>
      </div>
    </div>
  );
};

export default Bio;