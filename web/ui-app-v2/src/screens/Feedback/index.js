import React, { Component } from "react";
import RatingsComponent from "./components/Ratings";
import ButtonGroupComponent from "./components/ButtonToggle";
import TextAreaComponent from "./components/TextArea";
import RaisedButton from "material-ui/RaisedButton";
import "./index.css";
import InfoTableComponent from "./components/InfoTable";

class Feedback extends Component {
  InfoTable = {
    items: [
      {
        label: "APPLICATION NO.",
        childElements: <span>25467895</span>,
      },
      {
        label: "COMPLAINT",
        childElements: <span>Overflowing of Bins</span>,
      },
      {
        label: "LOCATION",
        childElements: <span>Ward No. 6</span>,
      },
    ],
  };
  state = {
    items: [
      {
        label: "Service",
        value: "Service",
      },
      {
        label: "Resolution Time",
        value: "RT",
      },
      {
        label: "Other",
        value: "Other",
      },
    ],
    value: [],
  };

  onClick = (value, multiple) => {
    if (multiple) {
      var valueArray = this.state.value.slice(0);
      if (valueArray.indexOf(value) > -1) {
        valueArray.splice(valueArray.indexOf(value), 1);
      } else {
        valueArray.push(value);
      }
      this.setState({ value: valueArray });
    } else {
      this.setState(value === this.state.value ? { value: null } : { value });
    }
  };

  render() {
    let { items, value } = this.state;
    return (
      <div className="feedback-main-container">
        <div className="feedback-infoCard-container feedback-Card-container-1">
          <InfoTableComponent items={this.InfoTable.items} />
        </div>
        <div className="feedback-Card-container-2">
          <div className="feedback-firstCard-top">
            <span className="feedback-firstCard-heading">
              Your feedback is valuable to us.<br />rate our service.
            </span>
          </div>
          <RatingsComponent />
          <div className="feedback-firstCard-bottom">
            <span className="feedback-firstCard-subheading">What did you like from us?</span>
            <div className="feedback-buttongroup-cont">
              <ButtonGroupComponent items={items} selected={value} onClick={this.onClick} />
            </div>
          </div>
        </div>

        <div className="feedback-Card-container-3 feedback-lastCard-container">
          <span className="feedback-textarea-label">Is there anything else you want to know?</span>
          <TextAreaComponent />
        </div>
        <div className="feedback-button-cont">
          <RaisedButton
            label="Submit"
            backgroundColor={`#f5a623`}
            fullWidth={true}
            labelStyle={{ color: "#ffffff", fontWeight: "500" }}
            style={{
              height: "53px",
              lineHeight: "53px",
            }}
          />
        </div>
      </div>
    );
  }
}

export default Feedback;
