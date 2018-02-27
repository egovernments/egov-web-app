import React from "react";
import PropTypes from "prop-types";
import RefreshIndicator from "material-ui/RefreshIndicator";

const LoadingIndicator = ({ status, loadingColor, size, left, top, style }) => {
  return (
    <div style={status === "hide" ? style.containerHide : style.container}>
      <RefreshIndicator size={40} left={50} top={0} status="loading" loadingColor={loadingColor} style={style} />
    </div>
  );
};

LoadingIndicator.propTypes = {
  size: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  status: PropTypes.string,
  loadingColor: PropTypes.string,
  style: PropTypes.object,
};

export default LoadingIndicator;
