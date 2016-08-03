import React from 'react';
import Image from './Image';

const Bio = ({email, name, gender, location, website, picture}) => {
  const pictureDom = picture 
    ? (<Image src={picture} />)
    : undefined;
  const nameDom = name
    ? (<div>name:<span>{name}</span></div>)
    : undefined;
  const genderDom = gender
    ? (<div>gender:<span>{gender}</span></div>)
    : undefined;
  const emailDom = email
    ? (<div>email:<span>{email}</span></div>)
    : undefined;
  const locationDom = location
    ? (<div>location:<span>{location}</span></div>)
    : undefined;
  const websiteDom = website
    ? (<div>website:<a href={website}>My Website</a></div>)
    : undefined;

  return (
    <div>
      {pictureDom}
      {nameDom}
      {genderDom}
      {emailDom}
      {locationDom}
      {websiteDom}
    </div>
  );
};

export default Bio;