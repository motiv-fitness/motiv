import React from 'react';

const Regime = ({label, name, type}) => {
  return (
    <div>
      <span>{label}</span> : <span>{name}</span> : <span>{type}</span>
    </div>
  );
};

export default Regime;
