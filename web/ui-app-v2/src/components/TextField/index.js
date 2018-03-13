import React from "react";
import PropTypes from "prop-types";
import MaterialUITextField from "material-ui/TextField";
import "./index.css";

const errorStyle = {
  marginTop: "5px",
};

const hintStyle = {
  fontSize: "14px",
};
const floatingLabelStyle = {
  top: 18,
  fontSize: "14px",
};

const floatingLabelShrinkStyle = {
  fontSize: "12px",
  transform: "scale(1) translate(0px, -16px)",
  color: "#6090ae",
  fontWeight: 500,
};

const TextField = ({ style, onChange, id, disabled, placeholder, fullWidth = false, className = "", value, floatingLabelText }) => {
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
      floatingLabelShrinkStyle={floatingLabelShrinkStyle}
      fullWidth={fullWidth}
      hintText={placeholder}
      hintStyle={hintStyle}
      floatingLabelText={floatingLabelText}
      floatingLabelStyle={floatingLabelStyle}
      floatingLabelFixed={false}
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
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  className: PropTypes.string,
};

export default TextField;
