import React, { Component } from "react";
import Banner from "../../../common/Banner";
import LoginForm from "../../../common/User/components/LoginForm";

class Login extends Component {
  state = {
    phoneNumber: "",
  };

  login = () => {
    this.props.history.push("/citizen");
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };
  render() {
    const { login, onPhoneNumberChanged } = this;
    const { phoneNumber } = this.state;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <LoginForm login={login} onPhoneNumberChanged={onPhoneNumberChanged} phoneNumber={phoneNumber} isEmployee={false} />
      </Banner>
    );
  }
}

export default Login;
