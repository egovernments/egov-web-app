import React from "react";
import { Button } from "components";
import RatingsComponent from "../Ratings";
import TextAreaComponent from "../TextArea";
import CheckBoxGroup from "../CheckBoxGroup";

const FeedbackForm = ({ form, handleFieldChange, onCheck, value }) => {
  const fields = form.fields || {};
  let comments;
  if (fields) {
    comments = fields.comments;
  }
  const submit = form.submit;
  return (
    <div>
      {
        <div className="feedback-main-container">
          <div className="feedback-form">
            <RatingsComponent onChange={(e, value) => handleFieldChange("rating", value)} />
            <CheckBoxGroup selected={value} onCheck={onCheck} />
            <TextAreaComponent onChange={(e, value) => handleFieldChange("comments", value)} {...comments} />
          </div>
        </div>
      }
      <div className="feedback-popup-button-cont">
        <Button {...submit} primary={true} fullWidth={true} onClick={this.onSubmit} />
      </div>
    </div>
  );
};

export default FeedbackForm;
