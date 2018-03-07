import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Image, Card, Label, ButtonGroup } from "../../components";
import logoMuncipal from "../../assets/images/PB logo.png";
import logoMseva from "../../assets/images/Mseva logo.png";
import "./index.css";

const cardStyle = {
  style: {
    position: "absolute",
    top: "35%",
    left: "2.5%",
    padding: "0px",
    height: "284px",
    right: "1.94%",
  },
};
const defaultBGColor = "transparent";
const BGColor = "#3498db";

const labelStyle = {
  textTransform: "none",
  fontWeight: "900",
  color: "#ffffff",
  verticalAlign: "initial",
};

const defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "44px",
  lineHeight: "44px",
  width: "28.48%",
};

const style = {
  border: "0px",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "44px",
  lineHeight: "44px",
  width: "28.48%",
  backgroundColor: "#3498db",
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
};

class LanguageSelection extends Component {
  state = {
    items: [
      {
        label: "ENGLISH",
        value: "English",
      },
      {
        label: "हिंदी",
        value: "Hindi",
      },
      {
        label: "ਪੰਜਾਬੀ",
        value: "Marati",
      },
    ],
  };

  onClick = (value) => {
    this.setState({ value });
  };

  render() {
    let { items, value } = this.state;

    return (
      <div className="user-login col-xs-12 col-lg-6 col-sm-6 col-md-6 col-lg-offset-3 col-sm-offset-3 col-md-offset-3">
        <div className="imageContainer" />
        <div className="cardBackground" />
        <Image className="logo" circular={true} source={`${logoMuncipal}`} />
        <Card
          className="language-selection-card"
          card={cardStyle}
          textChildren={
            <div style={{ marginTop: "74px" }}>
              <form>
                <Label label="Pick your language" className="language-label" />
                <div className="button-toggle-container">
                  <ButtonGroup
                    items={items}
                    onClick={this.onClick}
                    selected={value}
                    defaultStyle={defaultStyle}
                    defaultLabelStyle={defaultLabelStyle}
                    BGColor={BGColor}
                    defaultBGColor={defaultBGColor}
                    labelStyle={labelStyle}
                    style={style}
                  />
                </div>
                <div className="button-container">
                  <Button id="continue-action" primary={true} label="Continue" fullWidth={true} style={{ width: "95.34%" }} />
                </div>
              </form>
            </div>
          }
        />
        <Image className="mseva-logo" source={`${logoMseva}`} />
      </div>
    );
  }
}

export default LanguageSelection;
