import React, { Component } from "react";
import Banner from "../../../common/Banner";
import LoginForm from "../../../common/User/components/LoginForm";

class Login extends Component {
  state = {
    phoneNumber: "",
    username: "",
    passwd: "",
  };

  login = () => {
    this.props.history.push("/employee/all-complaints");
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };

  onUnameChange = (e, value) => {
    this.setState({ username: value });
  };

  onPsswdChange = (e, value) => {
    this.setState({ passwd: value });
  };

  onForgotPasswdCLick = () => {
    this.props.history.push("/employee/user/forgot-password");
  };

  render() {
    const { login, onPhoneNumberChanged, onUnameChange, onPsswdChange, onForgotPasswdCLick } = this;
    const { phoneNumber, username, passwd } = this.state;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <LoginForm
          login={login}
          onPhoneNumberChanged={onPhoneNumberChanged}
          phoneNumber={phoneNumber}
          onUnameChange={onUnameChange}
          username={username}
          onPsswdChange={onPsswdChange}
          passwd={passwd}
          isEmployee={true}
          onForgotPasswdCLick={onForgotPasswdCLick}
        />
      </Banner>
    );
  }
}

export default Login;
