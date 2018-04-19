import React from "react";
import { Button, Card, TextField } from "components";
import Label from "utils/translationNode";
import "./index.css";

const PasswordForm = ({ onChange, form, formKey, submitChangePasswdForm }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div className="employee-change-password">
      {/* <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="CHANGE PASSWORD" /> */}
      <form style={{ padding: "0px 16px 0px 16px" }}>
        <TextField
          className="emp-change-passwd-field"
          onChange={(e, value) => onChange(formKey, "existingPassword", value)}
          {...fields.existingPassword}
        />
        <TextField className="emp-change-passwd-field" onChange={(e, value) => onChange(formKey, "newpassword", value)} {...fields.newpassword} />
        <TextField
          className="emp-change-passwd-field"
          onChange={(e, value) => onChange(formKey, "confirmnewpassword", value)}
          {...fields.confirmnewpassword}
        />

        <Button
          {...submit}
          className="employee-change-passwd-submit col-lg-offset-2 col-md-offset-2"
          fullWidth={true}
          onClick={() => submitChangePasswdForm(formKey)}
          primary={true}
        />
      </form>
    </div>
  );
};

export default PasswordForm;
