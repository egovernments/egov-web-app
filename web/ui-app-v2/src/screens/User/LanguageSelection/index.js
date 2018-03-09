import React, { Component } from "react";
import { withRouter } from "react-router";
import { ButtonGroup, Button, Label, Card } from "../../../components";
import UserScreensWrapper from "../components/UserScreenWrapper";
import "./index.css";

// const defaultBGColor = "transparent";
// const BGColor = "#3498db";

const selectedLabelStyle = {
  color: "#ffffff",
  fontSize: "14.5px",
  letterSpacing: "0.7px",
  padding: "0 14px",
  fontWeight: "900",
};

const selectedStyle = {
  backgroundColor: "#3498db",
  border: "1px solid #3498db",
};

const defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "44px",
  lineHeight: "44px",
  width: "28.48%",
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

  onClick = value => {
    this.setState({ value });
  };

  onLanguageSelect = () => {
    this.props.history.push("/login");
  };

  render() {
    const { items, value } = this.state;
    const { onLanguageSelect, onClick } = this;

    return (
      <UserScreensWrapper>
        <Card
          className="user-screens-card language-selection-card"
          textChildren={
            <div style={{ marginTop: "50px" }}>
              <form>
                <Label label="Pick your language" className="language-label" />
                <div className="button-toggle-container">
                  <ButtonGroup
                    items={items}
                    onClick={onClick}
                    selected={value}
                    defaultStyle={defaultStyle}
                    defaultLabelStyle={defaultLabelStyle}
                    selectedStyle={selectedStyle}
                    selectedLabelStyle={selectedLabelStyle}
                    multiple={false}
                  />
                </div>
                <div className="button-container">
                  <Button id="continue-action" onClick={onLanguageSelect} primary={true} label="Continue" fullWidth={true} />
                </div>
              </form>
            </div>
          }
        />
      </UserScreensWrapper>
    );
  }
}

export default withRouter(LanguageSelection);
