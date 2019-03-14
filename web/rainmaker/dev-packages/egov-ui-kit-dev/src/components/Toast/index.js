import React from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";
import Label from "../../utils/translationNode";

const Toast = ({ open = false, autoHideDuration = 4000, error = true, message, variant }) => {
  console.log("message is...", message);
  const { labelName, labelKey } = message;
  return (
    <Snackbar
      open={open}
      id="toast-message"
      // message={message}
      message={<Label label={labelKey} defaultLabel={labelName} color="#fff" />}
      autoHideDuration={autoHideDuration}
      style={{ pointerEvents: "none", width: "95%", whiteSpace: "nowrap", justifyContent: "center" }}
      bodyStyle={{
        pointerEvents: "initial",
        maxWidth: "none",
        lineHeight: "20px",
        height: "auto",
        maxHeight: "60px",
        padding: "5px",
        whiteSpace: "pre-line",
        textAlign: "center",
      }}
    />
  );
};

Toast.propTypes = {
  // message: PropTypes.string.isRequired,
  open: PropTypes.bool,
  error: PropTypes.bool,
  autoHideDuration: PropTypes.number,
};

export default Toast;
