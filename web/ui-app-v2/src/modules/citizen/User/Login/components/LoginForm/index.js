import React from "react";
import { Button, Label, Card, MobileNumberField } from "../../../../../../components";
import "./index.css";

const LoginForm = ({ login, onChange, form, formKey }) => {
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="LOGIN" />
          <form>
            <MobileNumberField onChange={(e, value) => onChange(formKey, "phone", value)} {...form.phone} />
            <Button id="login-submit-action" fullWidth={true} onClick={login} primary={true} label="Login" />
          </form>
        </div>
      }
    />
  );
};

export default LoginForm;
