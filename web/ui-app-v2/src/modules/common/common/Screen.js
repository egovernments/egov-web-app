import React from "react";
import { LoadingIndicator } from "components";

const Screen = ({ children, className = "", loading }) => {
  return (
    <div className={`screen col-xs-12 col-sm-12 col-md-8 col-lg-8 col-lg-offset-2 col-md-offset-2 ${className}`}>
      {children}
      {loading && <LoadingIndicator />}
    </div>
  );
};

export default Screen;
