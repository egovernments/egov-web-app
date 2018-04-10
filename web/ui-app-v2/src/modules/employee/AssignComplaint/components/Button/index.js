import React from "react";
import { Button, Icon } from "components";
import { setRoute } from "redux/app/actions";

const ButtonComponent = ({ label }) => {
  return <Button id="feedback-acknowledgement" onClick={() => setRoute("/citizen")} primary={true} label={label} fullWidth={true} />;
};
export default ButtonComponent;
