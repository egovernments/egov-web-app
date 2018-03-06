import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Image, Label, TextField, Card } from "../../components";
import logoMuncipal from "../../assets/images/logo-muncipal.png";
import "./index.css";


const cardStyle = {
  style: {
    position: "absolute",
    top: "35%",
    left: "7%",
    right: "6%",

  },
  cardBackground: {
    position: "relative",
    backgroundColor: "#f2f2f2",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "350px",
    border: "1px solid #e6e6e6",
    boxSizing: "border-box",
  },
};



class OTP extends Component {
  state = {
    otp: "",
    disabled: false,
  };

  componentDidMount() {
    const otpElement = document.getElementById("otp");

    otpElement.addEventListener("smsReceived", e => {
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

      <div className="user-otp col-xs-12 col-lg-6 col-sm-6 col-md-6 col-lg-offset-3 col-sm-offset-3 col-md-offset-3">
        <div className="imageContainer" />
        <div className="cardBackground" />
        <Image className="logo" circular={true} source={`${logoMuncipal}`} />
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
      </div>
    );
  }
}

export default withRouter(OTP);
