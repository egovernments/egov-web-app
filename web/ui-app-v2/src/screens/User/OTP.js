import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Image, Label, TextField, Card } from "../../components";
import logoMuncipal from "../../assets/images/logo-muncipal.png";
import bannerMuncipal from "../../assets/images/banner-muncipal.png";

const styles = {
  logo: {
    margin: "0 auto",
    display: "block",
    width: "100px",
    height: "100px",
    position: "absolute",
    left: "40%",
    top: "28%",
    zIndex: "100",
  },
  imageContainer: {
    position: "relative",
    backgroundImage: `url(${bannerMuncipal})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "300px",
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

const cardStyle = {
  style: {
    position: "absolute",
    top: "35%",
    left: "7%",
    right: "6%",
  },
};
const Banner = () => {};

const Form = () => {};

class OTP extends Component {
  onOtpSubmit = () => {
    this.props.history.push("/");
  };

  render() {
    const { onOtpSubmit } = this;
    return (
      <div className="col-xs-12 col-lg-6 col-sm-6 col-md-6 col-lg-offset-3 col-sm-offset-3 col-md-offset-3">
        <div style={styles.imageContainer} />
        <div style={styles.cardBackground} />
        <Image style={styles.logo} circular={true} source={`${logoMuncipal}`} />
        <Card
          card={cardStyle}
          textChildren={
            <div>
              <Label
                label="We have sent a 4 digit OTP number to your registered mobile number. Enter the OTP to create your account."
                className="otp-text"
                labelStyle={{ marginTop: "10%" }}
              />

              <form>
                <TextField className="textfield" id="otp" fullWidth={true} placeholder="Enter OTP" />

                <Label label="Didn't recieve OTP?" labelStyle={{ float: "left", margin: "5% 10% 5% 10%" }} />
                <Label label="RESEND" labelStyle={{ color: "#6090ae", float: "right", margin: "5% 10% 5% 10%" }} />

                <Button onClick={onOtpSubmit} primary={true} label="Start" fullWidth={true} />
              </form>
            </div>
          }
        />
      </div>
    );
  }
}

export default withRouter(OTP);
