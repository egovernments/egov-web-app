import React from "react";
import { Button, Label, Card, MobileNumberField } from "../../../../../../components";
import "./index.css";

const LoginForm = ({ login, onPhoneNumberChanged, phoneNumber }) => {
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="LOGIN" />
          <form>
            <MobileNumberField
              onChange={onPhoneNumberChanged}
              value={phoneNumber}
              fullWidth={true}
              isRequired={true}
              hintText="Enter your Mobile Number"
              floatingLabelText="Phone Number"
            />
            <Button id="login-submit-action" onClick={login} primary={true} label="Login" fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default LoginForm;
