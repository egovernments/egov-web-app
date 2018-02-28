import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Image, DropDown, TextField, Card } from "../../components";

const styles = {
  logo: {
    margin: "0 auto",
    display: "block",
    height: "100px",
    width: "100px",
  },
  imageContainer: {
    position: "relative",
    backgroundImage: `url(https://i.imgur.com/7M1osdL.png)`,
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
              <Image
                style={styles.logo}
                circular={true}
                source="https://lh3.googleusercontent.com/wD-6OqDafrx6DAgJDGarnGF4B6KrG7EGnHBAiWr18drml_IntNgyibMv17OxqifPYb88Y7WQyTCpEmTF7L1PQ3uePpsNuXILtPDl-GKcXqEh3BpSENQEfKT9xxqWTQulUnFD-VpXI9NJtxZYzSnRR9qCX2YPTGdXk0mlMfK8qjBY03-prrF10NzjN3zoAy6XMf8ph40KmWkEAEvzzbn6vtmPiy-st2JYtI6lRi0Tfd4xj74hMn17BNOXF6-evRGjyW8nSdpy21kQ3Oe1Nnt4Z80nt0-2-CAWN5FoMw_IsWkq5ydIA0J0qaYEgHOT_Y9DeOyIogQ7F0yuFwo8JjZWgcw82SOel-oKcDkjzFQwdj2JiJmuiDx64HGTPt6i_VvwWwzTDaDV0jL3rJdAH59e49U5Ffr3xVNF1CvI_77jE0R4S6ck_6ZAlv7bbNjQRUS9N1B-SG7d10cBMcytAhZVyQDPvBXUqxcRl1heJXuwhKufTMb_UbVBoogTIE7HgvR5Zv7zQ0PDqz_MgwemZJ_6Kp5xyGxgwA4V-r6MsaeqzccWoevaTf_lHwt6fA=w1280-h703"
              />
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
