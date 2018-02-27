import React from "react";
import PropTypes from "prop-types";

const baseStyle = {
  marginRight: 24,
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "12px"
};

const Icon = ({style,color, action,name}) => {
  const WrappedIcon = require(`material-ui/svg-icons/${action}/${name}`).default;
  return <WrappedIcon style={Object.assign({},baseStyle,style)} color={color}  />
}

Icon.propTypes = {
    action : PropTypes.string,
    name : PropTypes.string,
    color : PropTypes.string,
    style : PropTypes.object,
};

export default Icon;