import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

const baseStyle = {
    display : "block"
} 

const baseLabelStyle = {
  fontSize: "12px",
  paddingLeft : "0px"
};

const Label = ({ children, icon, labelStyle, labelPosition = "after", label, style, primary, className }) => {
  return (
    <FlatButton labelStyle={Object.assign({}, baseLabelStyle, labelStyle)} children={children} labelPosition={labelPosition} className={className} style={Object.assign({},baseStyle,style)} icon={icon} primary={primary} label={label} />
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
