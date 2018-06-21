import React from "react";
import { Button, Icon } from "components";
import { SuccessMessage } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const ReopenAcknowledgement = ({ history }) => {
  const userInfo = localStorage.getItem("user-info");
  const role = (userInfo && userInfo.roles && userInfo.roles.length && userInfo.roles[0].code.toLowerCase()) || null;

  return (
    <div className="reopen-success-container">
      <div className="success-message-main-screen">
        <SuccessMessage successmessage="CS_REOPEN_SUCCESS_MESSAGE" icon={<Icon action="navigation" name="check" />} backgroundColor={"#22b25f"} />
      </div>
      <div className="btn-without-bottom-nav">
        <Button
          id="success-message-acknowledgement"
          onClick={() => (role === "citizen" ? history.push("/citizen") : history.push("/employee/all-complaints"))}
          primary={true}
          label={<Label buttonLabel={true} label="CORE_COMMON_GOTOHOME" />}
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default ReopenAcknowledgement;
