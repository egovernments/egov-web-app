import React from "react";
import { Button, TextField, MobileNumberField, Card } from "../../../../../../components";
import Label from "../../../../../../utils/translationNode";
import CityPicker from "../../../../../common/CityPicker";
import "./index.css";

const RegisterForm = ({ formKey, form, onChange, navigateToLogin, submitForm }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="heading text-center" bold={true} dark={true} fontSize={16} label="CORE_REGISTER_HEADING" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(formKey);
            }}
          >
            <MobileNumberField {...fields.phone} onChange={(e, value) => onChange(formKey, "phone", value)} />
            <TextField {...fields.name} onChange={(e, value) => onChange(formKey, "name", value)} />
            <CityPicker onChange={onChange} formKey={formKey} fieldKey="city" field={fields.city} />
            <div onClick={navigateToLogin} style={{ marginBottom: "24px" }} className="text-right">
              <Label id="otp-trigger" className="otp-prompt" label="CORE_REGISTER_HAVE_ACCOUNT" />
              <Label containerStyle={{ cursor: "pointer" }} id="otp-resend" className="otp-resend" label="CORE_COMMON_LOGIN" />
            </div>
            <Button primary={true} fullWidth={true} {...submit} />
          </form>
        </div>
      }
    />
  );
};

export default RegisterForm;
