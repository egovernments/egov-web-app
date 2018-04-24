import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

const Button = ({
  id = "",
  className,
  backgroundColor,
  children,
  disabled = false,
  label = "Continue",
  primary = true,
  onClick,
  labelColor,
  type,
  fullWidth = false,
  style = {},
}) => {
  return (
    <RaisedButton
      className={className}
      children={children}
      disabled={disabled}
      primary={primary}
      label={label}
      type={type}
      backgroundColor={backgroundColor}
      labelColor={labelColor}
      fullWidth={fullWidth}
      onClick={onClick}
      style={style}
      style={style}
      id={id}
    />
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  style: PropTypes.object,
};

export default Button;
