import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Image, DropDown, TextField, Card } from "../../components";
import logoMuncipal from "../../assets/images/logo-muncipal.png";
import bannerMuncipal from "../../assets/images/banner-muncipal.png";

const styles = {
  logo: {
    margin: "0 auto",
    display: "block",
    height: "100px",
    width: "100px",
  },
  imageContainer: {
    position: "relative",
    backgroundImage: `url(${bannerMuncipal})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "300px",
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
      <div className="col-xs-12 col-lg-6 col-sm-6 col-md-6 col-lg-offset-3 col-sm-offset-3 col-md-offset-3">
        <div style={styles.imageContainer} />
        <Card
          textChildren={
            <div>
              <Image style={styles.logo} circular={true} source={`${logoMuncipal}`} />
              <form>
                <TextField className="textfield" name="name" id="name" fullWidth={true} placeholder="Name" />
                <DropDown value={1} name="cities" dropDownData={dropDownData} fullWidth={true} />
                <TextField
                  className="textfield"
                  name="phone-number"
                  id="phone-number"
                  underlineShow={false}
                  fullWidth={true}
                  placeholder="Phone Number"
                />
                <Button onClick={login} primary={true} label="Submit" fullWidth={true} />
              </form>
            </div>
          }
        />
      </div>
    );
  }
}

export default withRouter(Login);
