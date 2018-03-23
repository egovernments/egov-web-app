import React from "react";
import { Button, Label, Card, MobileNumberField, TextField } from "../../../../../components";
import "./index.css";

const LoginForm = ({ login, onPhoneNumberChanged, phoneNumber, onUnameChange, username, onPsswdChange, passwd, isEmployee, onForgotPasswdCLick }) => {
  return (
    <Card
      className="user-screens-card"
      textChildren={
        <div>
          <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="LOGIN" />
          <form>
            {!isEmployee && (
              <MobileNumberField
                onChange={onPhoneNumberChanged}
                value={phoneNumber}
                fullWidth={true}
                isRequired={true}
                hintText="Enter your Mobile Number"
                floatingLabelText="Phone Number"
              />
            )}
            {isEmployee && (
              <div>
                <TextField
                  onChange={onUnameChange}
                  id="user-uname"
                  hintText="Enter your employee ID"
                  fullWidth={true}
                  className="emp-user"
                  value={username}
                  inputStyle={{}}
                  isRequired={true}
                  floatingLabelText="User Name"
                />
                <TextField
                  onChange={onPsswdChange}
                  id="user-psswd"
                  floatingLabelText="Password"
                  hintText="Enter your Password"
                  fullWidth={true}
                  className="emp-user"
                  value={passwd}
                  inputStyle={{}}
                  isRequired={true}
                />
                <div onClick={onForgotPasswdCLick}>
                  <Label style={{ marginBottom: "12px" }} className="text-center forgot-passwd" fontSize={14} label="FORGOT PASSWORD?" onCLick />
                </div>
              </div>
            )}
            <Button id="login-submit-action" onClick={login} primary={true} label="Login" fullWidth={true} />
          </form>
        </div>
      }
    />
  );
};

export default LoginForm;
