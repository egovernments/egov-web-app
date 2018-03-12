import React from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";

const CheckboxUi = ({ options, defaultValue, onCheck, style = {}, checkedIcon, iconStyle }) => {
  const renderCheckboxOptions = () => {
    return options.map((option, index) => {
      return (
        <Checkbox
          key={index}
          value={option.value}
          label={option.label}
          onCheck={onCheck}
          label={option.label}
          style={option.style}
          iconStyle={iconStyle}
          checkedIcon={checkedIcon}
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
  defaultValue: PropTypes.string,
  onCheck: PropTypes.func,
  style: PropTypes.object,
};

export default CheckboxUi;
