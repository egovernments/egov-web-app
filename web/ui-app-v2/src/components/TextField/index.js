import React from "react";
import PropTypes from "prop-types";
import MaterialUITextField from "material-ui/TextField";
import "./index.css";

const errorStyle = {
  marginTop: "5px",
};

const TextField = ({ style = {}, value, onChange, id, disabled, placeholder, fullWidth = false, className = "" }) => {
  return (
    <MaterialUITextField
      errorStyle={errorStyle}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`textfield ${className}`}
      underlineShow={false}
      style={style}
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
