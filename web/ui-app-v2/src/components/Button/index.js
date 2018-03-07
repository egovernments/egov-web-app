import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

const buttonStyle = {
  height: "53px",
  lineHeight: "53px",
};

const Button = ({ label, icon = {}, onClick, backgroundColor, labelColor, fullWidth, disabled, hide, primary = false, style = {}, id }) => {
  return (
    <RaisedButton
      style={Object.assign({}, buttonStyle, style)}
      disabled={disabled}
      fullWidth={fullWidth}
      primary={primary}
      label={label}
      onClick={onClick}
      backgroundColor={backgroundColor}
      labelColor={labelColor}
      icon={
        <i style={icon.style} className="material-icons">
          {icon.name}
        </i>
      }
      id={id}
    />
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
