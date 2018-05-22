import React from "react";
import { Button } from "components";
import Question from "modules/common/pgr/ReOpenComplaint/components/Question";
import TextArea from "modules/common/pgr/ReOpenComplaint/components/TextArea";
import ImageUpload from "modules/common/common/ImageUpload";

const ReopenComplaintForm = ({ form, handleFieldChange, onCheck, value, formkey }) => {
  const fields = form.fields || {};
  let comments;
  if (fields) {
    comments = fields.comments;
  }
  const submit = form.submit;
  return (
    <div>
      <div className="reopencomplaint-question">
        <Question options={this.options} label="CS_REOPEN_COMPLAINT_WHY" handleChange={handleOptionsChange} valueSelected={valueSelected} />
      </div>
      <div className="reopencomplaint-upload-photo">
        <ImageUpload module="rainmaker-pgr" formKey={formKey} fieldKey="media" />
      </div>
      <div className="reopencomplaint-textArea">
        <TextArea onChange={handleCommentChange} {...textarea} />
      </div>
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reopencomplaint-button">
        <Button {...submitprops} primary={true} fullWidth={true} onClick={handleComplaintSubmit} />
      </div>
    </div>
  );
};

export default ReopenComplaintForm;
