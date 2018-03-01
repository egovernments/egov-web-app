import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const labelText = (label, labelStyle) => {
  return label && label.length ? (
    <div className="label-text" style={labelStyle}>
      {label}
    </div>
  ) : (
    ""
  );
};

const labelIcon = icon => {
  return icon ? <div className="label-icon">{icon}</div> : "";
};

const Label = ({ className = "", label, children, iconPosition = "before", icon, color, containerStyle = {}, labelStyle = {} }) => {
  let labelPadding,
    additionalStyles = {};

  if (icon) {
    additionalStyles.padding = "0px 15px";
  }
  if (color) {
    additionalStyles.color = color;
  }

  if (Object.keys(labelStyle).length || Object.keys(additionalStyles).length) {
    labelStyle = Object.assign({}, labelStyle, additionalStyles);
  }

  return (
    <div style={containerStyle} className={`label-container ${className}`}>
      {iconPosition === "before" ? labelIcon(icon) : ""}
      {labelText(label, labelStyle)}
      {iconPosition === "after" ? labelIcon(icon) : ""}
    </div>
  );
};

Label.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.node,
  iconPosition: PropTypes.oneOf(["after", "before"]),
  containerStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

export default Label;
