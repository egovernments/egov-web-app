import React from "react";
import { ComplaintSubmited } from "modules/common";

const ComplaintCreated = (props) => {
  return <ComplaintSubmited homeRoute="/employee/all-complaints" {...props} />;
};

export default ComplaintCreated;
