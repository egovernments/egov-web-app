import React, { Component } from "react";
import Banner from "../../../common/Banner";
import RegisterForm from "./components/RegisterForm";

class Register extends Component {
  state = {
    name: "",
    phoneNumber: "",
  };

  register = () => {
    this.props.history.push("/citizen/otp");
  };

  navigateToLogin = () => {
    this.props.history.push("/citizen/login");
  };

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
        <RegisterForm
          register={register}
          onNameChanged={onNameChanged}
          navigateToLogin={navigateToLogin}
          onPhoneNumberChanged={onPhoneNumberChanged}
          name={name}
          phoneNumber={phoneNumber}
        />
      </Banner>
    );
  }
}

export default Register;
