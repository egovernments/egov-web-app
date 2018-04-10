import React from "react";
import { Button, Card, MobileNumberField, TextField } from "components";
import Label from "utils/translationNode";

const PasswordForm = ({ submitForm, onChange, form, formKey }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="CHANGE PASSWORD" />
          <form>
            <TextField onChange={(e, value) => onChange(formKey, "existingPassword", value)} {...fields.existingPassword} />
            <TextField onChange={(e, value) => onChange(formKey, "newpassword", value)} {...fields.newpassword} />
            <TextField onChange={(e, value) => onChange(formKey, "confirmnewpassword", value)} {...fields.confirmnewpassword} />

            <Button {...submit} fullWidth={true} onClick={() => submitForm(formKey)} primary={true} />
          </form>
        </div>
      }
    />
  );
};

export default PasswordForm;
