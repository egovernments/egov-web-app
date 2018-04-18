import React from "react";
import { Button, Card, MobileNumberField } from "components";
import Label from "utils/translationNode";
import "./index.css";

const ForgotPasswd = ({ onContinueClick, onPhoneNumberChanged, fields, phoneNumber, isEmployee }) => {
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
            label="CORE_COMMON_FORGOT_PASSWORD_LABEL"
          />
          <form>
            {isEmployee && (
              <MobileNumberField
                onChange={onPhoneNumberChanged}
                {...phoneNumber}
                textFieldStyle={{ bottom: 16 }}
                prefixStyle={{ top: 21 }}
                fullWidth={true}
                isRequired={true}
                {...fields.username}
              />
            )}
            <Button id="login-submit-action" onClick={onContinueClick} primary={true} label="CONTINUE" fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default ForgotPasswd;
