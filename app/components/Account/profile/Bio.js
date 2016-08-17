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
  const locationDom = location
    ? (<div><span>{location}</span></div>)
    : undefined;
  const websiteDom = website
    ? (<div><a href={website}>My Website</a></div>)
    : undefined;

  return (
    <div className="bio-div">
      {pictureDom}
      {nameDom}
      {emailDom}
      {locationDom}
      {websiteDom}
    </div>
  );
};

export default Bio;