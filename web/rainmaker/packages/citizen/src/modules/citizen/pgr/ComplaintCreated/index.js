import React from "react";
import { ComplaintSubmited } from "modules/common";

const ComplaintCreated = (props) => {
  return <ComplaintSubmited homeRoute="/citizen" location={props.location} />;
};

export default ComplaintCreated;
