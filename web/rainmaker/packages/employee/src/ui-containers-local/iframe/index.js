import React from "react";
import "./index.css";

const Iframe = (props) => {
  return <iframe src={props.src} frameBorder="0" allowFullScreen className="iframe-style" {...props} />;
};

export default Iframe;
