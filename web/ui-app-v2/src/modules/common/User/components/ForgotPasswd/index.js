import React from "react";
import { Button, Label, Card, MobileNumberField, TextField } from "../../../../../components";
import "./index.css";

const LoginForm = ({ onContinueClick, onPhoneNumberChanged, phoneNumber, isEmployee }) => {
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="FORGOT PASSWORD?" />
          <form>
            {isEmployee && (
              <MobileNumberField
                onChange={onPhoneNumberChanged}
                value={phoneNumber}
                fullWidth={true}
                isRequired={true}
                hintText="Enter your Mobile Number"
                floatingLabelText="Mobile Number"
              />
            )}
            <Button id="login-submit-action" onClick={onContinueClick} primary={true} label="CONTINUE" fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default LoginForm;
