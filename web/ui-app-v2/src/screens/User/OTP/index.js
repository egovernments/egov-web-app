import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Label, TextField, Card } from "../../../components";
import UserScreensWrapper from "../components/UserScreenWrapper";
import "./index.css";

const cardStyle = {
  style: {
    position: "absolute",
    top: "35%",
    left: "25px",
    right: "25px",
    padding: "8px",
  },
};

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
      <UserScreensWrapper>
        <Card
          card={cardStyle}
          textChildren={
            <div>
              <Label
                label="We have sent a 4 digit OTP number to your registered mobile number. Enter the OTP to create your account."
                className="otp-text"
              />

              <form>
                <TextField onChange={onOtpChanged} id="otp" disabled={disabled} value={otp} fullWidth={true} placeholder="Enter OTP" />
                <div style={{ margin: "10px 0px 10px" }} className="text-right">
                  <Label id="otp-trigger" className="otp-prompt" label="Didn't recieve OTP?" />
                  <Label id="otp-resend" className="otp-resend" label="RESEND" />
                </div>
                <Button id="otp-start" onClick={onOtpSubmit} primary={true} label="Start" fullWidth={true} />
              </form>
            </div>
          }
        />
      </UserScreensWrapper>
    );
  }
}

export default withRouter(OTP);
