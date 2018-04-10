import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "components";
import { setRoute } from "redux/app/actions";
import SuccessMessage from "modules/common/SuccessMessage/components/successmessage";
import Label from "utils/translationNode";
import "./index.css";

const FeedbackAcknowledge = ({ setRoute }) => {
  return (
    <div>
      <div className="feedback-main-screen">
        <SuccessMessage successmessage="CS_FEEDBACK_SUCCESS" icon={<Icon action="navigation" name="check" />} backgroundColor={"#22b25f"} />
      </div>
      <div className="feedback-popup-button-cont ">
        <Button
          id="feedback-acknowledgement"
          onClick={() => setRoute("/citizen")}
          primary={true}
          label={<Label buttonLabel={true} label="CORE_COMMON_CONTINUE" />}
          fullWidth={true}
        />
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
