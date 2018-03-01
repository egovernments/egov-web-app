import React, { Component } from "react";
import RatingsComponent from "./components/Ratings";
import ButtonGroupComponent from "./components/ButtonToggle";
import TextAreaComponent from "./components/TextArea";
import RaisedButton from "material-ui/RaisedButton";
import "./index.css";
import cloneDeep from "lodash/cloneDeep";

class Feedback extends Component {
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
    value: null,
  };

  onClick = (value) => {
    this.setState({ value });
  };

  render() {
    let { items, value } = this.state;
    return (
      <div className="feedback-main-container">
        <div className="feedback-firstCard-container">
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

        <div className="feedback-secondCard-container">
          <span className="feedback-textarea-label">Is there anything else you want to know?</span>
          <TextAreaComponent />
        </div>
        <div className="feedback-button-cont">
          <RaisedButton label="Submit" backgroundColor={`#f5a623`} style={{}} fullWidth={true} labelStyle={{ color: "#ffffff", fontWeight: "900" }} />
        </div>
      </div>
    );
  }
}

export default Feedback;
