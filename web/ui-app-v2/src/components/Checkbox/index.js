import React from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";

const CheckboxUi = ({ checked, onCheck, style = {}, label, index }) => {
  return (
    <Checkbox
      onCheck={onCheck}
      label={label}
      key={index}
      checked={checked}
      style={style}
    />
  );
};

CheckboxUi.propTypes = {
  checked: PropTypes.bool,
  onCheck: PropTypes.func,
  style: PropTypes.object
};

export default CheckboxUi;
