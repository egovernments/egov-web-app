import React, { Component } from "react";
import PropTypes from "prop-types";
// can we pull the existing textfield
import TextField from "../TextField";

const containerStyle = {
  position: "relative",
  display: "inline-block",
  width: "100%",
  boxSizing: "border-box",
};

const getStyles = (iconPosition, textFieldProps) => {
  const textFieldStyle = {};

  const iconStyle = {
    position: "absolute",
    color: "#969696",
    zIndex: 2,
    bottom: 15,
  };
  iconStyle[iconPosition === "before" ? "left" : "right"] = 0;
  textFieldStyle["textIndent"] = iconPosition === "before" ? 30 : 0;

  if (textFieldProps.floatingLabelText) {
    iconStyle.top = 30;
  }

  return {
    iconStyle,
    textFieldStyle,
  };
};

const TextFieldIcon = ({ Icon, iconStyle = {}, textFieldStyle = {}, iconPosition = "after", ...textFieldProps }) => {
  const style = getStyles(iconPosition, textFieldProps);
  return (
    <div style={containerStyle}>
      <Icon style={{ ...style.iconStyle, ...iconStyle }} />
      <TextField name="textfield-icon" style={{ ...style.textFieldStyle, ...textFieldStyle }} fullWidth={false} {...textFieldProps} />
    </div>
  );
};

TextFieldIcon.propTypes = {
  iconPosition: PropTypes.string,
  textFieldStyle: PropTypes.object,
  iconProps: PropTypes.object,
  iconStyle: PropTypes.object,
};

export default TextFieldIcon;
