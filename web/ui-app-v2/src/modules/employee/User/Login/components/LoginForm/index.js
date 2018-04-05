import React from "react";
import { Button,Card, MobileNumberField, TextField } from "components";
import Label from "utils/translationNode";
import "./index.css";


const LoginForm = ({ submitForm, onChange, form, formKey,onForgotPasswdCLick }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="LOGIN" />
          <form>
            <TextField
              onChange={(e, value) => onChange(formKey, "username", value)}
              {...fields.username}
            />
            <TextField
              onChange={(e, value) => onChange(formKey, "password", value)}
              {...fields.password}
            />
            {/*<div onClick={onForgotPasswdCLick}>
              <Label style={{ marginBottom: "12px" }} className="text-center forgot-passwd" fontSize={14} label="FORGOT PASSWORD?" onCLick />
            </div>*/}
            <Button {...submit} fullWidth={true} onClick={() => submitForm(formKey)} primary={true} />
          </form>
        </div>
      }
    />
  );
};

export default LoginForm;
