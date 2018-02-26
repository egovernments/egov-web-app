import React, { Component } from "react";
import { withRouter } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import DropDown from "../../components/DropDown";
import Image from "../../components/Image";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

const styles = {
  logo: {
    margin: "0 auto",
    display: "block",
  },
  imageContainer: {
    position: "relative",
  },
  formContainer: {
    padding: "10px",
    // why 65? ~= imageHeight/2 + paddding + bottomMargin
    marginTop: "-65px",
  },
};

class Login extends Component {
  dropDownData = [
    {
      value: 1,
      label: "Amritsar",
    },
    {
      value: 2,
      label: "Patiala",
    },
  ];

  login = () => {
    this.props.history.push("/otp");
  };

  render() {
    const { login, dropDownData } = this;
    return (
      <div className="col-xs-12 col-lg-4 col-sm-6 col-md-4 col-lg-offset-4 col-sm-offset-3 col-md-offset-4">
        <Image source="https://placeimg.com/450/450/arch" />
        <Paper style={styles.formContainer} zDepth={1}>
          <Image style={styles.logo} circular={true} source="https://placeimg.com/100/100/tech" />
          <form>
            <TextField className="textfield" id="name" fullWidth={true} placeholder="Name" />
            <DropDown value={1} dropDownData={dropDownData} fullWidth={true} />
            <TextField className="textfield" id="phone-number" underlineShow={false} fullWidth={true} placeholder="Phone Number" />
            <Button onClick={login} primary={true} label="Submit" fullWidth={true} />
          </form>
        </Paper>
      </div>
    );
  }
}

export default withRouter(Login);
