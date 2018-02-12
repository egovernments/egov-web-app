import React from "react";
const TextField = ({ value, onChange, disabled, hide }) => {
  return (
    <input
      onChange={onChange}
      disabled={disabled}
      hide={hide}
      placeholder="Type Something"
      value={value}
    />
  );
};

export default TextField;
