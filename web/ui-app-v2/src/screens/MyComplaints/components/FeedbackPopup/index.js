import React from "react";
import "./index.css";
import { Dialog, Ratings, Checkbox, TextArea, Button } from "../../../../components";

const titleStyle = {
  textAlign: "center",
  fontSize: "18px",
  fontWeight: 900,
  padding: "20px 0 0 0",
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
            <Ratings className="feedback-ratings" size={30} count={5} half={false} />
          </div>,
          <span key={"feedback-subtext"} style={{ textAlign: "center", display: "block", marginBottom: "10px" }}>
            What was good?
          </span>,
          <Checkbox key={"feedbox-checkboxGroup"} options={checkboxOptions} />,
          <TextArea key={"feedback-textarea"} hintText="Type your comments" underlineShow={true} />,
        ]}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FeedbackPopup;
