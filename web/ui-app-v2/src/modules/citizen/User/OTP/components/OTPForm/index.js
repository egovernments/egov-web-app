import React from "react";
import { Button, TextField, Card } from "components";
import Label from "utils/translationNode";
import "./index.css";

const OTP = ({ formKey, form, onChange, submitForm, number }) => {
  const fields = form.fields || {};
  const submit = form.submit;

  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="otp-heading text-center" bold={true} dark={true} fontSize={16} label="ENTER OTP" />
          <Label label="CORE_OTP_SENT_MESSAGE" />
          <Label label="9968739374" />
          <form>
            <TextField onChange={(e, value) => onChange(formKey, "otp", value)} id="otp" {...fields.otp} fullWidth={true} />
            <div style={{ marginBottom: "24px" }} className="text-right">
              <Label id="otp-trigger" className="otp-prompt" label="CORE_OTP_NOT_RECEIVE" />
              <Label id="otp-resend" className="otp-resend" label="CORE_OTP_RESEND" />
            </div>
            <Button onClick={() => submitForm(formKey)} {...submit} primary={true} fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default OTP;
