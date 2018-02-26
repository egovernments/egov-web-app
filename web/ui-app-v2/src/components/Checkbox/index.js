import React from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";

const CheckboxUi = ({ options, checkedValues, defaultValue, onCheck, style = {} }) => {
  const renderCheckboxOptions = () => {
    return options.map((option, index) => {
      var value = checkedValues.indexOf(option.value);
      const isChecked = value !== -1 ? true : false;
      return (
        <Checkbox
          onCheck={value !== -1 ? checkedValues.splice(index, value) : checkedValues.push(option.value)}
          label={option.label}
          key={index}
          checked={isChecked}
          style={style}
        />
      );
    });
  };

  return <div>{renderCheckboxOptions()}</div>;
};

CheckboxUi.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired
  ),
  checkedValues: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
  onCheck: PropTypes.func,
  style: PropTypes.object,
};

export default CheckboxUi;
