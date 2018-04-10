import React from "react";
import { Button, Icon } from "components";
import { setRoute } from "redux/app/actions";
import "./index.css";

const ButtonComponent = ({ label }) => {
  return (
    <div className="assign-complaint-button-cont">
      <Button id="assign-complaint-button" onClick={() => setRoute("/citizen")} primary={true} label={label} fullWidth={true} />;
    </div>
  );
};
export default ButtonComponent;
