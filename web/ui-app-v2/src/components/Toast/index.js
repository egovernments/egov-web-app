import React from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";

const Toast = ({ open = false, autoHideDuration = 4000, error = true, message }) => {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={autoHideDuration}
      style={{ pointerEvents: "none", width: "95%", top: "0px", whiteSpace: "nowrap" }}
      bodyStyle={{
        pointerEvents: "initial",
        maxWidth: "none",
        backgroundColor: error ? "#a94442" : "#3c763d",
        lineHeight: "20px",
        height: "auto",
        maxHeight: "65px",
        padding: "5px",
        whiteSpace: "pre-line",
        textAlign: "center",
      }}
    />
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool,
  error: PropTypes.bool,
  autoHideDuration: PropTypes.number,
};

export default Toast;
