import React from "react";
import { Button, Label, Card, MobileNumberField } from "../../../../../components";
import "./index.css";

const LoginForm = ({ onContinueClick, onPhoneNumberChanged, phoneNumber, isEmployee }) => {
  return (
    <Card
      className="user-screens-card forgot-passwd-card"
      textChildren={
        <div>
          <Label
            style={{ marginBottom: "12px" }}
            className="text-center forgotpasswd"
            bold={true}
            dark={true}
            fontSize={16}
            label="FORGOT PASSWORD?"
          />
          <form>
            {isEmployee && (
              <MobileNumberField
                onChange={onPhoneNumberChanged}
                value={phoneNumber}
                textFieldStyle={{ bottom: 16 }}
                prefixStyle={{ top: 21 }}
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
