import React from 'react';

const Regime = ({name, exercise}) => {
  return (
    <div>
      <span>{name}</span> : <span>{exercise}</span>
    </div>
  );
};

export default Regime;
