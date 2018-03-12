import React from "react";
import PropTypes from "prop-types";

const baseStyle = {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "12px",
};

const Icon = ({ action, name, style = {}, color = "#fff", onClick }) => {
  let error = "";
  try {
    let WrappedIcon = null;
    const appliedStyle = { ...baseStyle, ...style };

    if (action === "custom") {
      WrappedIcon = require(`../../custom-icons/${name}`).default;
    } else {
      WrappedIcon = require(`material-ui/svg-icons/${action}/${name}`).default;
    }
    return <WrappedIcon style={appliedStyle} color={color} onClick={onClick} />;
  } catch (error) {}
  throw new Error("Icon not found");
};

Icon.propTypes = {
  action: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Icon;
