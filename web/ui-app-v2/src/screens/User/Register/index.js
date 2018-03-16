import React, { Component } from "react";
import { Button, TextField, MobileNumberField, Card } from "../../../components";
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

  onNameChanged = (e, value) => {
    this.setState({ name: value });
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };

  render() {
    const { register, onNameChanged, onPhoneNumberChanged } = this;
    const { name, phoneNumber } = this.state;

    return (
      <Banner className="col-lg-offset-3 col-md-offset-3 col-md-6 col-lg-6">
        <Card
          className="user-screens-card"
          textChildren={
            <div>
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
