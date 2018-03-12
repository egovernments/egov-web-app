import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const labelText = (label, labelStyle, labelClassName) => {
  return label && label.length ? (
    <div className={`label-text ${labelClassName}`} style={labelStyle}>
      {label}
    </div>
  ) : (
    ""
  );
};

const labelIcon = (icon) => {
  return icon ? <div className="label-icon">{icon}</div> : "";
};

const Label = ({
  className = "",
  label,
  children,
  iconPosition = "before",
  icon,
  color,
  upperCase = false,
  bold = false,
  containerStyle = {},
  labelStyle = {},
}) => {
  let additionalStyles = {};

  if (icon) {
    additionalStyles.padding = "0px 15px";
  }
  if (color) {
    additionalStyles.color = color;
  }
  if (bold) {
    additionalStyles.fontWeight = 500;
  }
  if (upperCase) {
    additionalStyles.textTransform = "uppercase";
  }

  if (Object.keys(labelStyle).length || Object.keys(additionalStyles).length) {
    labelStyle = Object.assign({}, labelStyle, additionalStyles);
  }

  return (
    <div style={containerStyle} className={`label-container ${className}`}>
      {children}
      {iconPosition === "before" ? labelIcon(icon) : ""}
      {labelText(label, labelStyle)}
      {iconPosition === "after" ? labelIcon(icon) : ""}
    </div>
  );
};

Label.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  upperCase: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.node,
  iconPosition: PropTypes.oneOf(["after", "before"]),
  containerStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelClassName: PropTypes.string,
};

export default Label;
