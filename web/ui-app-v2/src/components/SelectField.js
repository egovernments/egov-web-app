import React from "react";

const SelectField = ({ value, onChange, dropDownData = [] }) => {
  return (
    <select onChange={onChange}>
      {dropDownData.map(option => (
        <option value={option.key} key={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
