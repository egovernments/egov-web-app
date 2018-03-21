import React, { Component } from "react";
import RatingsComponent from "./components/Ratings";
import TextAreaComponent from "./components/TextArea";
import "./index.css";
import CheckBoxGroup from "./components/CheckBoxGroup";
import { Button, Icon, Label } from "../../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { withRouter } from "react-router-dom";

class Feedback extends Component {
  state = {
    value: [],
    submitted: false,
  };

  onCheck = (value) => {
    var valueArray = this.state.value.slice(0);
    if (valueArray.indexOf(value) > -1) {
      valueArray.splice(valueArray.indexOf(value), 1);
    } else {
      valueArray.push(value);
    }
    this.setState({ value: valueArray });
  };

  onSubmit = (history) => {
    if (this.state.submitted === false) {
      this.setState({ submitted: true });
    } else {
      history.push("/citizen/complaint-details?status=resolved");
    }
  };

  render() {
    let { history } = this.props;
    let { items, value, submitted } = this.state;
    return (
      <div className="feedback-main-container">
        {!submitted ? (
          <div className="feedback-form">
            <RatingsComponent /> <CheckBoxGroup selected={value} onCheck={this.onCheck} /> <TextAreaComponent />
          </div>
        ) : (
          <div className="feedback-submitted-main-cont">
            <div className="feedback-submitted-icon-cont">
              <FloatingActionButton className="floating-button" style={{ boxShadow: 0 }} backgroundColor={"#22b25f"}>
                <Icon action="navigation" name="check" />
              </FloatingActionButton>
            </div>
            <Label label={"Thank you for your feedback"} className="feedback-thankyou-text" dark={true} bold={true} fontSize={"16px"} />
          </div>
        )}
        <div className="feedback-popup-button-cont">
          <Button
            label={submitted ? "CONTINUE" : "SUBMIT"}
            primary={true}
            fullWidth={true}
            onClick={(e) => {
              this.onSubmit(history);
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Feedback);
