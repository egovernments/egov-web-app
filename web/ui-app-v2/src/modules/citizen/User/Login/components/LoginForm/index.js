import React from "react";
import { Button, Card, MobileNumberField } from "components";
import Label from "utils/translationNode";

const LoginForm = ({ submitForm, onChange, form, formKey }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="CORE_COMMON_LOGIN" />
          <form>
            <MobileNumberField onChange={(e, value) => onChange(formKey, "phone", value)} {...fields.phone} />
            <Button {...submit} fullWidth={true} onClick={() => submitForm(formKey)} primary={true} />
          </form>
        </div>
      }
    />
  );
};

export default LoginForm;
