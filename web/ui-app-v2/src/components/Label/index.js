import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

const Label = ({ label, style }) => {
  return <FlatButton style={style} label={label} />;
};

Label.PropTypes = {
  label: PropTypes.string,
  style: PropTypes.object
};

export default Label;
