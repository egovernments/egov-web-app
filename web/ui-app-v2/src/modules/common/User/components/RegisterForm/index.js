import React from "react";
import { Button, TextField, MobileNumberField, Label, Card } from "../../../../../components";
import CityPicker from "../../../CityPicker";
import "./index.css";

const RegisterForm = ({ formKey, form, onChange, navigateToLogin, register }) => {
  const fields = form.fields || {};
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="heading text-center" bold={true} dark={true} fontSize={16} label="REGISTER" />
          <form>
            <MobileNumberField {...fields.phone} onChange={(e, value) => onChange(formKey, "phone", value)} />
            <TextField {...fields.name} onChange={(e, value) => onChange(formKey, "name", value)} />
            <CityPicker onChange={onChange} formKey={formKey} fieldKey="city" field={fields.city} />
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
