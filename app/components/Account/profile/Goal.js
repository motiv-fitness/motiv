import React from 'react';

const Goal = ({label, value}) => {
  return (
    <div>
      <span>{label}</span> : <span>{value}</span>
    </div>
  );
};

export default Goal;