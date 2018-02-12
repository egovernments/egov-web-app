import React from "react";
const TextField = ({ value, onChange }) => {
  return (
    <input onChange={onChange} placeholder="Type Something" value={value} />
  );
};

export default TextField;
