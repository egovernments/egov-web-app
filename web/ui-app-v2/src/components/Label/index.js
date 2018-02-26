import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

const Label = ({ children, icon, labelPosition = "after", label, style, primary, className }) => {
  return (
    <FlatButton children={children} labelPosition={labelPosition} className={className} style={style} icon={icon} primary={primary} label={label} />
  );
};

Label.propTypes = {
  label: PropTypes.string,
  primary: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
  labelPosition: PropTypes.oneOf(["after", "before"]),
  style: PropTypes.object,
};

export default Label;
