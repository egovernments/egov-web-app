import React from "react";

const Screen = ({ children, className = "" }) => {
  return <div className={`screen col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 ${className}`}>{children}</div>;
};

export default Screen;
