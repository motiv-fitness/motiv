import React from 'react';

const Goal = ({target, measurement, progressName}) => {
  return (
    <div>
      <span>{progressName.name}</span> : <span>{target}</span> : <span>{measurement}</span> :
      <span>{progressName.description}</span>
      <span>{progressName.type}</span>
    </div>
  );
};

export default Goal;
