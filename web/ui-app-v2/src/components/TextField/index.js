import React from "react";
import PropTypes from "prop-types";
import MaterialUITextField from "material-ui/TextField";
import "./index.css";

const errorStyle = {
  marginTop: "5px",
};

const hintStyle = {
  fontSize : "14px",
  color : "#969696"
}

const TextField = ({
  style,
  onChange,
  id,
  disabled,
  placeholder,
  fullWidth = false,
  className = "textfield",
  value,
  floatingLabelText,
  floatingLabelStyle,
}) => {
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
      hintStyle={hintStyle}
      floatingLabelText={floatingLabelText}
      floatingLabelStyle={floatingLabelStyle}
      floatingLabelFixed={true}
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
