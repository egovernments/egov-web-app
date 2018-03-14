import React from "react";
import "./index.css";
import { Dialog, Ratings, Checkbox, TextArea, Button } from "../../../../components";

const titleStyle = {
  textAlign: "center",
  fontSize: "16px",
  fontWeight: 500,
  padding: "28px 0 0 0",
  letterSpacing: 0.7,
  lineHeight: 1,
  color: "#484848",
};

const actions = [
  <div key={"feedback-submit-button"} className="feedback-popup-button-cont">
    <Button label="SUBMIT" primary={true} fullWidth={true} />
  </div>,
];
const FeedbackPopup = ({ open, checkboxOptions, handleClose }) => {
  return (
    <div>
      <Dialog
        title={"Rate your experience"}
        titleStyle={titleStyle}
        open={open}
        actions={actions}
        children={[
          <div className="feedback-ratings-cont" key={"feedback-ratings-cont"}>
            <Ratings className="feedback-ratings" size={40} count={5} half={false} />
          </div>,
          <span className="what-was-good" key={"feedback-subtext"}>
            What was good?
          </span>,
          <Checkbox
            key={"feedback-checkboxGroup"}
            labelStyle={{ letterSpacing: "0.6px" }}
            options={checkboxOptions}
            containerClassName={"feedback-checkbox-cont"}
          />,
          <TextArea key={"feedback-textarea"} hintText="Type your comments" underlineShow={true} />,
        ]}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FeedbackPopup;
