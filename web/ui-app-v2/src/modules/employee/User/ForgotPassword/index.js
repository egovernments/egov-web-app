import React, { Component } from "react";
import Banner from "../../../common/Banner";
import ForgotPasswd from "../../../common/User/components/ForgotPasswd";

class ForgotPassword extends Component {
  state = {
    phoneNumber: "",
  };

  onContinueClick = () => {
    this.props.history.push("/employee/user/otp");
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };

  render() {
    const { onPhoneNumberChanged, onContinueClick } = this;
    const { phoneNumber } = this.state;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <ForgotPasswd isEmployee={true} onPhoneNumberChanged={onPhoneNumberChanged} onContinueClick={onContinueClick} />
      </Banner>
    );
  }
}

export default ForgotPassword;
