import React from 'react';

const Stat = ({label, value}) => {
  return (
    <div>
      <span>{label}</span> : <span>{value}</span>
    </div>
  );
};

export default Stat;