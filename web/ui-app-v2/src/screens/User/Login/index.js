import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, DropDown, TextField, Card } from "../../../components";
import UserScreensWrapper from "../components/UserScreenWrapper";
import "./index.css";

class Login extends Component {
  state = {
    name: "",
    phoneNumber: "",
  };

  dropDownData = [
    {
      value: 1,
      label: "Amritsar",
    },
    {
      value: 2,
      label: "Patiala",
    },
  ];

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
    const { login, dropDownData, onNameChanged, onPhoneNumberChanged } = this;
    const { name, phoneNumber } = this.state;

    return (
      <UserScreensWrapper>
        <Card
          className="user-screens-card"
          textChildren={
            <div style={{ marginTop: "50px" }}>
              <form>
                <TextField value={name} onChange={onNameChanged} name="name" id="login-name-field" fullWidth={true} floatingLabelText="Name" />
                <DropDown
                  id="login-city-field"
                  name="cities"
                  value={1}
                  dropDownData={dropDownData}
                  fullWidth={true}
                  floatingLabelText="City"
                  style={{ border: "1px solid #e6e6e6" }}
                />
                <TextField
                  id="login-phone-number"
                  onChange={onPhoneNumberChanged}
                  value={phoneNumber}
                  name="phone-number"
                  underlineShow={false}
                  fullWidth={true}
                  floatingLabelText="Phone Number"
                />
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
