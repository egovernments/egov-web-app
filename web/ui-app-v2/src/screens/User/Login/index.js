import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, TextField, MobileNumberField, Card } from "../../../components";
import UserScreensWrapper from "../components/UserScreenWrapper";
import CityPicker from "../../common/CityPicker";
import "./index.css";

class Login extends Component {
  state = {
    name: "",
    phoneNumber: "",
  };

  login = () => {
    this.props.history.push("/otp");
  };

  onNameChanged = (e, value) => {
    this.setState({ name: value });
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };

  render() {
    const { login, onNameChanged, onPhoneNumberChanged } = this;
    const { name, phoneNumber } = this.state;

    return (
      <UserScreensWrapper>
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
                  underlineShow={false}
                  fullWidth={true}
                  hintText="Enter your Mobile Number"
                  floatingLabelText="Phone Number"
                />
                <TextField
                  value={name}
                  onChange={onNameChanged}
                  name="person-name"
                  hintText="Enter your Name"
                  id="person-name"
                  fullWidth={true}
                  floatingLabelText="Name"
                />
                <CityPicker />
                <Button id="login-submit-action" onClick={login} primary={true} label="Submit" fullWidth={true} />
              </form>
            </div>
          }
        />
      </UserScreensWrapper>
    );
  }
}

export default withRouter(Login);
