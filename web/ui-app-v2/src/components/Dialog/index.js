import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import PropTypes from "prop-types";

const Dialogui = (props) => {
  let { dialogProps } = props;
  return <Dialog {...dialogProps} />;
};

Dialogui.propTypes = {
  dialogProps: PropTypes.object,
};

export default Dialogui;
