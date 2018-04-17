import React from "react";
import { Button, TextField, Card } from "components";
import Label from "utils/translationNode";
import "./index.css";

const OTP = ({ formKey, form, onChange, phoneNumber, resendOTP, submitForm }) => {
  const fields = form.fields || {};
  const submit = form.submit;

  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="otp-heading text-center" bold={true} dark={true} fontSize={16} label="CORE_OTP_HEADING" />
          <div className="citizen-otp-sent-message">
            <Label label="CORE_OTP_SENT_MESSAGE" />
            <Label label={phoneNumber} />
          </div>
          <Label label="CORE_COMMON_CHECK_MESSAGE" color={"#b3b3b3"} fontSize={"12px"} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(formKey);
            }}
          >
            <TextField
              errorStyle={{ bottom: "0px" }}
              onChange={(e, value) => onChange(formKey, "otp", value)}
              id="otp"
              {...fields.otp}
              fullWidth={true}
              type={"number"}
            />
            <div style={{ marginBottom: "24px" }} className="text-right">
              <Label id="otp-trigger" className="otp-prompt" label="CORE_OTP_NOT_RECEIVE" />
              <span style={{ cursor: "pointer" }} onClick={() => resendOTP()}>
                <Label id="otp-resend" className="otp-resend" label="CORE_OTP_RESEND" />
              </span>
            </div>
            <Button {...submit} primary={true} fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default OTP;
