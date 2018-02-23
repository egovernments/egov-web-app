import React from 'react';

const NumberField = ({ value, min = 0, max }) => {
  return <input type="number" value={value} min={min} max={max} />;
};

export default NumberField;
