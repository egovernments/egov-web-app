import React from "react";
import PropTypes from "prop-types";
import MaterialUITextField from "material-ui/TextField";

const errorStyle = {
  marginTop: "5px",
};

const baseStyle = {
  border: "1px solid #e6e6e6",
  paddingLeft: "10px",
  height: "56px",
  marginBottom: "5px",
  boxSizing: "border-box",
};

const TextField = ({ style, value, onChange, id, disabled, placeholder, fullWidth = false, className = "textfield" }) => {
  return (
    <MaterialUITextField
      errorStyle={errorStyle}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={className}
      underlineShow={false}
      style={Object.assign({}, baseStyle, style)}
      id={id}
      fullWidth={fullWidth}
      hintText={placeholder}
    />
  );
};

TextField.propTypes = {
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  hide: PropTypes.bool,
  className: PropTypes.string,
};

export default TextField;
