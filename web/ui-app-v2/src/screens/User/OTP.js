import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Label from '../../components/Label';

const styles = {
  logo: {
    margin: '0 auto',
    display: 'block',
  },
  resendOTP: {
    float: 'right',
  },
  formContainer: {
    padding: '10px',
    margin: '0px 2px',
    border: '1px solid black',
    zIndex: 30,
    // why 65? ~= imageHeight/2 + paddding + bottomMargin
    marginTop: '-65px',
  },
};

const Banner = () => {};

const Form = () => {};

export default class Login extends Component {
  render() {
    return (
      <div className="col-xs-12 col-lg-4 col-sm-4 col-md-4 col-lg-offset-4 col-sm-offset-4 col-md-offset-4">
        <Image source="https://placeimg.com/450/450/arch" />
        <div style={styles.formContainer}>
          <Image style={styles.logo} circular={true} source="https://placeimg.com/100/100/tech" />

          <span className="otp-text">We have sent a 4 digit OTP number to your registered mobile number. Enter the OTP to create your account.</span>

          <form>
            <TextField className="textfield" id="otp" fullWidth={true} placeholder="Enter OTP" />
            <div style={styles.resendOTP}>
              <Label label="Didn't recieve OTP?" />
              <Label primary={true} label="resend" />
            </div>
            <Button primary={true} label="Start" fullWidth={true} />
          </form>
        </div>
      </div>
    );
  }
}
