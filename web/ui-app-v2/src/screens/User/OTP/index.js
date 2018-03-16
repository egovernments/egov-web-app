import React, { Component } from "react";
import { Button, Label, TextField, Card } from "../../../components";
import Banner from "../../common/Banner";
import "./index.css";

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
    this.props.history.push("/");
  };

  onOtpChanged = (e, value) => {
    this.setState({ otp: value });
  };

  render() {
    const { onOtpSubmit, onOtpChanged } = this;
    const { otp, disabled } = this.state;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <Card
          className="user-screens-card"
          textChildren={
            <div>
              <Label className="otp-heading text-center" bold={true} dark={true} fontSize={16} label="ENTER OTP" />
              <Label className="otp-text"  label="An OTP has been sent to Mobile Number 9968739374" />

              <form>
                <TextField
                  onChange={onOtpChanged}
                  id="otp"
                  disabled={disabled}
                  value={otp}
                  fullWidth={true}
                  hintText="Enter OTP"
                  floatingLabelText="OTP"
                />
                <div style={{ marginBottom: "24px" }}  className="text-right">
                  <Label id="otp-trigger" className="otp-prompt" label="Didn't recieve OTP?" />
                  <Label id="otp-resend" className="otp-resend" label="RESEND" />
                </div>
                <Button id="otp-start" onClick={onOtpSubmit} primary={true} label="Get Started" fullWidth={true} />
              </form>
            </div>
          }
        />
      </Banner>
    );
  }
}

export default OTP;
