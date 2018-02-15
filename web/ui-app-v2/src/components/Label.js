import React from "react";

const Label = ({ hide, value = "Default" }) => {
  const style = {
    display: hide ? "none" : "block"
  };
  return <div style={style}>{value}</div>;
};

export default Label;
