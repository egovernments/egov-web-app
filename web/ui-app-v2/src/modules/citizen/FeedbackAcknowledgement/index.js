import React from "react";
import { connect } from "react-redux";
import { Button } from "components";
import { setRoute } from "redux/app/actions";
import SuccessMessage from "modules/common/SuccessMessage/components/successmessage";
import "./index.css";

const FeedbackAcknowledge = ({ setRoute }) => {
  return (
    <div>
      <div className="feedback-main-screen">
        <SuccessMessage successmessage={"Thank you for you feedback"} />
      </div>
      <div className="feedback-popup-button-cont ">
        <Button id="feedback-acknowledgement" onClick={() => setRoute("/citizen")} primary={true} label="CONTINUE" fullWidth={true} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(null, mapDispatchToProps)(FeedbackAcknowledge);
