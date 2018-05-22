import React from "react";
import { Button, Card, MobileNumberField } from "components";
import Label from "utils/translationNode";
import { startSMSRecevier } from "utils/commons";

const LoginForm = ({ handleFieldChange, form }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="CORE_COMMON_LOGIN" />
          <MobileNumberField onChange={(e, value) => handleFieldChange("phone", value)} {...fields.phone} />
          <Button
            {...submit}
            fullWidth={true}
            primary={true}
            onClick={(e) => {
              startSMSRecevier();
            }}
          />
        </div>
      }
    />
  );
};

export default LoginForm;
