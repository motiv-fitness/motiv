import React from 'react';

const Milestone = ({label, value}) => {
  return (
    <div>
      <span>{label}</span> : <span>{value}</span>
    </div>
  );
};

export default Milestone;