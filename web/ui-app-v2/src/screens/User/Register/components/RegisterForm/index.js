import React from "react";
import { Button, TextField, MobileNumberField, Label, Card } from "../../../../../components";
import CityPicker from "../../../../common/CityPicker";
import "./index.css";

const RegisterForm = ({ onPhoneNumberChanged, phoneNumber, navigateToLogin, register, onNameChanged, name }) => {
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label className="heading text-center" bold={true} dark={true} fontSize={16} label="REGISTER" />
          <form>
            <MobileNumberField
              id="person-phone-number"
              onChange={onPhoneNumberChanged}
              value={phoneNumber}
              name="phone-number"
              fullWidth={true}
              isRequired={true}
              hintText="Enter your Mobile Number"
              floatingLabelText="Phone Number"
            />
            <TextField
              value={name}
              onChange={onNameChanged}
              name="person-name"
              isRequired={true}
              hintText="Enter your Name"
              id="person-name"
              fullWidth={true}
              floatingLabelText="Name"
            />
            <CityPicker />
            <div onClick={navigateToLogin} style={{ marginBottom: "24px" }} className="text-right">
              <Label id="otp-trigger" className="otp-prompt" label="Have an account?" />
              <Label style={{ cursor: "pointer" }} id="otp-resend" className="otp-resend" label="LOGIN" />
            </div>

            <Button id="login-submit-action" onClick={register} primary={true} label="Submit" fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default RegisterForm;
