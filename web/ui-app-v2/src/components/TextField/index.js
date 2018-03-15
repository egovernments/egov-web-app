import React from "react";
import PropTypes from "prop-types";
import MaterialUITextField from "material-ui/TextField";

const errorStyle = {
  marginTop: 5,
};

const hintStyle = {
  fontSize: "14px",
};
const floatingLabelBaseStyle = {
  top: 30,
  fontSize: "14px",
};

const floatingLabelBaseShrinkStyle = {
  fontSize: "12px",
  color: "#00bcd1",
  transform: "scale(1) translate(0px, -16px)",
  fontWeight: 500,
};

const inputStyle = {
  paddingBottom: 10,
};

const requiredStyle = {
  color: "red",
};

const underlineFocusBaseStyle = {
  borderColor: "#e0e0e0",
};

const TextField = ({
  style,
  onChange,
  id,
  disabled,
  floatingLabelStyle = {},
  hintText,
  fullWidth = true,
  className = "",
  value,
  floatingLabelText,
  underlineFocusStyle = {},
  isRequired,
}) => {
  return (
    <MaterialUITextField
      errorStyle={errorStyle}
      value={value}
      onChange={onChange}
      disabled={disabled}
      inputStyle={inputStyle}
      className={`textfield ${className}`}
      style={style}
      id={id}
      floatingLabelShrinkStyle={floatingLabelBaseShrinkStyle}
      fullWidth={fullWidth}
      hintText={hintText}
      hintStyle={hintStyle}
      floatingLabelText={[floatingLabelText, isRequired ? <span style={requiredStyle}> *</span> : null]}
      floatingLabelStyle={{ ...floatingLabelBaseStyle, ...floatingLabelStyle }}
      underlineFocusStyle={{ ...underlineFocusBaseStyle, underlineFocusStyle }}
      underlineShow={true}
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
  hintText: PropTypes.string,
  isRequired: PropTypes.bool,
  hide: PropTypes.bool,
  floatingLabelText: PropTypes.string,
  className: PropTypes.string,
};

export default TextField;
