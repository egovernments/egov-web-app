import React from "react";
import RefreshIndicator from "material-ui/RefreshIndicator";

const style = {
  container: {
    height: "100%",
    width: "100%",
    position: "fixed",
    backgroundColor: "rgba(189,189,189,0.5)",
    zIndex: 9998,
    left: 0,
    top: 0
  },
  containerHide: {
    display: "none",
    position: "relative"
  },
  refresh: {
    display: "block",
    position: "relative",
    zIndex: 9999,
    marginLeft: "48%",
    marginTop: "23%"
  }
};

const LoadingIndicator = ({ status }) => {
  return (
    <div style={status === "hide" ? style.containerHide : style.container}>
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status={status}
        style={style.refresh}
      />
    </div>
  );
};

export default LoadingIndicator;
