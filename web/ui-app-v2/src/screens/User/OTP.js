import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Image, Label, TextField, Card } from "../../components";

const styles = {
  logo: {
    margin: "0 auto",
    display: "block",
    width: "100px",
    height: "100px",
  },
  resendOTP: {
    float: "right",
  },
  imageContainer: {
    position: "relative",
    backgroundImage: `url(https://i.imgur.com/7M1osdL.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "300px",
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
        <Card
          textChildren={
            <div>
              <Image
                style={styles.logo}
                circular={true}
                source="https://lh3.googleusercontent.com/wD-6OqDafrx6DAgJDGarnGF4B6KrG7EGnHBAiWr18drml_IntNgyibMv17OxqifPYb88Y7WQyTCpEmTF7L1PQ3uePpsNuXILtPDl-GKcXqEh3BpSENQEfKT9xxqWTQulUnFD-VpXI9NJtxZYzSnRR9qCX2YPTGdXk0mlMfK8qjBY03-prrF10NzjN3zoAy6XMf8ph40KmWkEAEvzzbn6vtmPiy-st2JYtI6lRi0Tfd4xj74hMn17BNOXF6-evRGjyW8nSdpy21kQ3Oe1Nnt4Z80nt0-2-CAWN5FoMw_IsWkq5ydIA0J0qaYEgHOT_Y9DeOyIogQ7F0yuFwo8JjZWgcw82SOel-oKcDkjzFQwdj2JiJmuiDx64HGTPt6i_VvwWwzTDaDV0jL3rJdAH59e49U5Ffr3xVNF1CvI_77jE0R4S6ck_6ZAlv7bbNjQRUS9N1B-SG7d10cBMcytAhZVyQDPvBXUqxcRl1heJXuwhKufTMb_UbVBoogTIE7HgvR5Zv7zQ0PDqz_MgwemZJ_6Kp5xyGxgwA4V-r6MsaeqzccWoevaTf_lHwt6fA=w1280-h703"
              />
              <span className="otp-text">
                We have sent a 4 digit OTP number to your registered mobile number. Enter the OTP to create your account.
              </span>

              <form>
                <TextField className="textfield" id="otp" fullWidth={true} placeholder="Enter OTP" />
                <div style={styles.resendOTP}>
                  <Label label="Didn't recieve OTP?" />
                  <Label primary={true} label="resend" />
                </div>
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
