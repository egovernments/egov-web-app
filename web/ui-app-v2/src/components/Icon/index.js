import React from "react";
import PropTypes from "prop-types";

const baseStyle = {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "12px",
};

const Icon = ({ style, color = "#fff", action, name, onClick }) => {
  const WrappedIcon = require(`material-ui/svg-icons/${action}/${name}`).default;
  return <WrappedIcon style={Object.assign({}, baseStyle, style)} color={color} onClick={onClick} />;
};

Icon.propTypes = {
  action: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Icon;
