import React from "react";
import { Button, Label, TextField, Card } from "../../../../../../components";
import "./index.css";

const OTP = ({ formKey, form, onChange, submitForm }) => {
  const fields = form.fields || {};

  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="otp-heading text-center" bold={true} dark={true} fontSize={16} label="ENTER OTP" />
          <Label className="otp-text" label="An OTP has been sent to Mobile Number 9968739374" />
          <form>
            <TextField onChange={(e, value) => onChange(formKey, "otp", value)} id="otp" {...fields.otp} fullWidth={true} />
            <div style={{ marginBottom: "24px" }} className="text-right">
              <Label id="otp-trigger" className="otp-prompt" label="Didn't recieve OTP?" />
              <Label id="otp-resend" className="otp-resend" label="RESEND" />
            </div>
            <Button id="otp-start" onClick={() => submitForm(formKey)} primary={true} label="Get Started" fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default OTP;
