import React from 'react';

const Image = ({src}) => {
  return (
    <img className='profile-img' src={src} alt='loading...'></img>
  );
};

export default Image;
