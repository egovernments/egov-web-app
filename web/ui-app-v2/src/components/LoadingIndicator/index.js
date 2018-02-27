import React from "react";
import RefreshIndicator from "material-ui/RefreshIndicator";


const LoadingIndicator = ({ status , loadingColor, size , left, top , style }) => {
  return (
    <div style={status === "hide" ? style.containerHide : style.container}>
      <RefreshIndicator 
      size={40} 
      left={50} 
      top={0} 
      status="loading"
      loadingColor={loadingColor}
      style={style} />
    </div>
  );
};

export default LoadingIndicator;
