import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, DropDown, TextField, TextFieldIcon, Card } from "../../../components";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
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
            <div>
              <form>
                <TextField
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
                <TextFieldIcon
                  floatingLabelText="City"
                  hintText="Enter your City"
                  iconPosition="after"
                  Icon={DownArrow}
                  id="person-city"
                  name="person-city"
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
