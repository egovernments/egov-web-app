import React from "react";
import { Button, TextField, MobileNumberField, Label, Card } from "../../../../../components";
import CityPicker from "../../../CityPicker";
import "./index.css";

const RegisterForm = ({ formKey, form, formConfig, onChange, navigateToLogin, register }) => {
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="heading text-center" bold={true} dark={true} fontSize={16} label="REGISTER" />
          <form>
            <MobileNumberField {...form.phone} onChange={(e, value) => onChange(formKey, "phone", value)} />
            <TextField {...form.name} onChange={(e, value) => onChange(formKey, "name", value)} />
            <CityPicker onChange={onChange} formKey={formKey} fieldKey="city" form={form.city} />
            <div onClick={navigateToLogin} style={{ marginBottom: "24px" }} className="text-right">
              <Label id="otp-trigger" className="otp-prompt" label="Have an account?" />
              <Label containerStyle={{ cursor: "pointer" }} id="otp-resend" className="otp-resend" label="LOGIN" />
            </div>
            <Button id="login-submit-action" onClick={register} primary={true} label="Submit" fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default RegisterForm;
