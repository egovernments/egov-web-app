import React, { Component } from "react";
import PropTypes from "prop-types";
// can we pull the existing textfield
import TextField from "../TextField";

const containerStyle = {
  position: "relative",
  display: "inline-block",
  width: "100%",
};

const getStyles = iconPosition => {
  const textFieldStyle = {
    padding: "15px",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
  };

  const iconStyle = {
    position: "absolute",
    color: "#969696",
    zIndex: 2,
    top: 18,
  };
  iconStyle[iconPosition === "before" ? "left" : "right"] = 5;
  textFieldStyle["textIndent"] = iconPosition === "before" ? 30 : 0;

  return {
    iconStyle,
    textFieldStyle,
  };
};

const TextFieldIcon = ({ value = "", Icon, iconStyle = {}, textFieldStyle = {}, iconPosition = "after", hintText, onChange }) => {
  const style = getStyles(iconPosition);
  return (
    <div style={containerStyle}>
      <Icon style={{ ...style.iconStyle, ...iconStyle }} />
      <TextField
        value={value}
        onChange={onChange}
        fullWidth={true}
        style={{ ...style.textFieldStyle, ...textFieldStyle }}
        underlineShow={false}
        placeholder={hintText}
      />
    </div>
  );
};

TextFieldIcon.propTypes = {
  iconPosition: PropTypes.string,
  textFieldStyle: PropTypes.object,
  iconProps: PropTypes.object,
  iconStyle: PropTypes.object,
  onChange: PropTypes.func,
  hint: PropTypes.string,
};

export default TextFieldIcon;
