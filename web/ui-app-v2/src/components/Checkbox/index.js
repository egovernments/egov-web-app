import React from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";

const CheckboxUi = ({ checked, onCheck, style = {}, field, index }) => {
  return (
    <Checkbox
      onCheck={onCheck}
      label={<span>
              {field.label} <span style={{ color: '#FF0000' }}>{field.isRequired ? ' *' : ''}</span>
            </span>}
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
