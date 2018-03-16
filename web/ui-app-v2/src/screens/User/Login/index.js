import React, { Component } from "react";
import { Button, Label, TextField, Card, MobileNumberField } from "../../../components";
import Banner from "../../common/Banner";
import "./index.css";

class Login extends Component {
  state = {
    phoneNumber: "",
  };

  login = () => {
    this.props.history.push("/");
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };
  render() {
    const { login, onPhoneNumberChanged } = this;
    const { phoneNumber } = this.state;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <Card
          className="user-screens-card"
          textChildren={
            <div>
              <Label style={{ marginBottom: "12px" }} className="text-center" bold={true} dark={true} fontSize={16} label="LOGIN" />
              <form>
                <MobileNumberField
                  id="person-phone-number"
                  onChange={onPhoneNumberChanged}
                  value={phoneNumber}
                  name="phone-number"
                  underlineShow={false}
                  fullWidth={true}
                  isRequired={true}
                  hintText="Enter your Mobile Number"
                  floatingLabelText="Phone Number"
                />
                <Button id="login-submit-action" onClick={login} primary={true} label="Login" fullWidth={true} />
              </form>
            </div>
          }
        />
      </Banner>
    );
  }
}

export default Login;
