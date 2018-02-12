import React from "react";
const SelectField = ({ value, onChange, options = [] }) => {
  return (
    <select onChange={onChange}>
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
