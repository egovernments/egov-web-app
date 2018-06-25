import React from "react";
import { ComplaintSubmited } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";

const ComplaintCreated = (props) => {
  return (
    <ComplaintSubmited
      homeRoute="/employee/all-complaints"
      lastLabel={<Label id="complaint-submitted-success-message" label="CS_COMPLAINT_SUBMITTED_LABEL2" />}
      {...props}
    />
  );
};

export default ComplaintCreated;
