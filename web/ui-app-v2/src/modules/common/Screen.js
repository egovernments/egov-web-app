import React from "react";

const Screen = ({ children, className = "" }) => {
  return <div className={`screen col-xs-12 col-sm-12 col-md-8 col-lg-8 col-lg-offset-2 col-md-offset-2 ${className}`}>{children}</div>;
};

export default Screen;
