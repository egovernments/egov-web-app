import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "components";
import { setRoute } from "redux/app/actions";
import SuccessMessage from "modules/common/SuccessMessage/components/successmessage";
import Label from "utils/translationNode";
import "./index.css";

const ReopenAcknowledgement = ({ setRoute }) => {
  return (
    <div className="reopen-success-container">
      <div className="success-message-main-screen">
        <SuccessMessage successmessage="CS_REOPEN_SUCCESS_MESSAGE" icon={<Icon action="navigation" name="check" />} backgroundColor={"#22b25f"} />
      </div>
      <div className="success-message-continue">
        <Button
          id="success-message-acknowledgement"
          onClick={() => setRoute("/citizen")}
          primary={true}
          label={<Label buttonLabel={true} label="CORE_COMMON_GOTOHOME" />}
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

export default connect(null, mapDispatchToProps)(ReopenAcknowledgement);
