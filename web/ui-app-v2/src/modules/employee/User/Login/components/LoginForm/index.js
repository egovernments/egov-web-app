import React from "react";
import { Button, Card, MobileNumberField, TextField } from "components";
import Label from "utils/translationNode";
import "./index.css";

const LoginForm = ({ submitForm, onChange, form, formKey, onForgotPasswdCLick }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="LOGIN" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(formKey);
            }}
          >
            <TextField onChange={(e, value) => onChange(formKey, "username", value)} {...fields.username} />
            <TextField onChange={(e, value) => onChange(formKey, "password", value)} {...fields.password} />
            <Button {...submit} fullWidth={true} primary={true} />
          </form>
        </div>
      }
    />
  );
};

export default LoginForm;
