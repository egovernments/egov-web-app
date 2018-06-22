import React from "react";
import { Button } from "components";
import { Question } from "modules/common";
import { TextArea } from "modules/common";

const RejectComplaintForm = ({ form, options, ontextAreaChange, handleOptionChange, optionSelected, commentValue }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div>
      <div className="custom-padding-for-screens">
        <div className="reject-complaint-question">
          <Question options={options} label={"ES_REJECT_COMPLAINT_QUESTION"} handleChange={handleOptionChange} valueSelected={optionSelected} />
        </div>
        <div className="reject-complaint-textArea">
          <TextArea onChange={ontextAreaChange} value={commentValue} {...fields.textarea} />
        </div>
      </div>
      <div className="responsive-action-button-cont">
        <Button className="responsive-action-button" id="rejectcomplaint-submit-action" primary={true} {...submit} fullWidth={true} />
      </div>
    </div>
  );
};

export default RejectComplaintForm;
