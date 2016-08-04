import React from 'react';

const RegimeDiet = ({diet, food}) => {
  return (
    <div>
      <span>{diet}</span> : <span>{food}</span>
    </div>
  );
};

export default RegimeDiet;
