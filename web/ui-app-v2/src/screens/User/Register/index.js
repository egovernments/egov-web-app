import React, { Component } from "react";
import { Button, TextField, MobileNumberField, Label, Card } from "../../../components";
import Banner from "../../common/Banner";
import CityPicker from "../../common/CityPicker";
import "./index.css";

class Register extends Component {
  state = {
    name: "",
    phoneNumber: "",
  };

  register = () => {
    this.props.history.push("/otp");
  };

  navigateToLogin = () => {
   this.props.history.push("/login"); 
  }

  onNameChanged = (e, value) => {
    this.setState({ name: value });
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };

  render() {
    const { register, onNameChanged, navigateToLogin, onPhoneNumberChanged } = this;
    const { name, phoneNumber } = this.state;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
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
                  <Label style={{cursor:"pointer"}} id="otp-resend" className="otp-resend" label="LOGIN" />
                </div>

                <Button id="login-submit-action" onClick={register} primary={true} label="Submit" fullWidth={true} />
              </form>
            </div>
          }
        />
      </Banner>
    );
  }
}

export default Register;
