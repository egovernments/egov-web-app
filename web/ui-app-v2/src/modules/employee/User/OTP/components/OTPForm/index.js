import React from "react";
import { Button, Card, MobileNumberField, TextField } from "components";
import Label from "utils/translationNode";
import "./index.css";

const OTPForm = ({ submitOTPForm, onChange, form, resendOTP, formKey, phoneNumber, history }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  if (!phoneNumber) {
    history.push("/employee/user/login");
  }

  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="text-center" bold={true} dark={true} fontSize={16} label="CORE_COMMON_FORGOT_PASSWORD_LABEL" />
          <div className="citizen-otp-sent-message" style={{ marginTop: 24 }}>
            <Label label="CORE_OTP_SENT_MESSAGE" />
            <Label label={" " + phoneNumber} />
          </div>
          <Label label="CORE_EMPLOYEE_OTP_CHECK_MESSAGE" color={"#b3b3b3"} fontSize={"12px"} />
          <form>
            <TextField
              errorStyle={{ bottom: "0px" }}
              onChange={(e, value) => onChange(formKey, "otpReference", value)}
              id="otp"
              {...fields.otpReference}
              fullWidth={true}
              type={"number"}
            />
            <div style={{ marginBottom: 0 }} className="text-right employee-resend-otp-text">
              <Label id="otp-trigger" className="otp-prompt" label="CORE_OTP_NOT_RECEIVE" />
              <span style={{ cursor: "pointer" }} onClick={() => resendOTP()}>
                <Label id="otp-resend" className="otp-resend" label="CORE_OTP_RESEND" />
              </span>
            </div>

            <TextField onChange={(e, value) => onChange(formKey, "newPassword", value)} {...fields.newPassword} />
            <TextField
              style={{ marginBottom: 24 }}
              onChange={(e, value) => onChange(formKey, "confirmnewpassword", value)}
              {...fields.confirmnewpassword}
            />

            <Button {...submit} fullWidth={true} onClick={() => submitOTPForm(formKey)} primary={true} />
          </form>
        </div>
      }
    />
  );
};

export default OTPForm;
