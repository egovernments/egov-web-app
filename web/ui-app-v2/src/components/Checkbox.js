import React from "react";

const Checkbox = ({ checked, onChange }) => {
  return <input onChange={onChange} checked={checked} type="checkbox" />;
};

export default Checkbox;
