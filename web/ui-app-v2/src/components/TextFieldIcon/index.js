import React, { Component } from "react";
import PropTypes from "prop-types";
// can we pull the existing textfield
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";

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
    top: 15,
    width: 20,
    height: 20,
  };
  iconStyle[iconPosition === "before" ? "left" : "right"] = 5;
  textFieldStyle["textIndent"] = iconPosition === "before" ? 40 : 0;

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
        hintText={hintText}
      />
    </div>
  );
};

TextFieldIcon.propTypes = {
  Icon: PropTypes.node.isRequired,
  iconPosition: PropTypes.string,
  textFieldStyle: PropTypes.object,
  iconProps: PropTypes.object,
  iconStyle: PropTypes.object,
  onChange: PropTypes.func,
  hint: PropTypes.string,
};

export default TextFieldIcon;
