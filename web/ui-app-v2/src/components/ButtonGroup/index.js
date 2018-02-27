import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

const ButtonGroup = ({ item, onClick }) => {
  return <FlatButton backgroundColor={item.style.background} label={item.label} style={item.style} hoverColor="none" onClick={onClick} />;
};

export default ButtonGroup;
