import React from "react";
import { Button } from "components";
import "./index.css";

const ButtonComponent = ({ label, onClick }) => {
  return (
    <div className="assign-complaint-button-cont">
      <Button id="assign-complaint-button" onClick={onClick} primary={true} label={label} fullWidth={true} />;
    </div>
  );
};
export default ButtonComponent;
