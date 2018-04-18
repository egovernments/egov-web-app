import React, { Component } from "react";
import Banner from "modules/common/Banner";
import OTPForm from "modules/common/User/components/OTPForm";

class OTP extends Component {
  state = {
    otp: "",
    disabled: false,
  };

  componentDidMount() {
    const otpElement = document.getElementById("otp");

    otpElement.addEventListener("smsReceived", (e) => {
      const { otp } = e.detail;
      this.setState({ otp, disabled: true });
    });
  }

  componentWillUnmount() {
    const otpElement = document.getElementById("otp");
    otpElement.removeEventListener("smsReceived", null);
  }

  onOtpSubmit = () => {
    this.props.history.push("/employee/all-complaints");
  };

  onOtpChanged = (e, value) => {
    this.setState({ otp: value });
  };

  render() {
    const { onOtpSubmit, onOtpChanged } = this;
    const { otp, disabled } = this.state;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <OTPForm onOtpChanged={onOtpChanged} onOtpSubmit={onOtpSubmit} otp={otp} disabled={disabled} btnText="Login" />
      </Banner>
    );
  }
}

export default OTP;
