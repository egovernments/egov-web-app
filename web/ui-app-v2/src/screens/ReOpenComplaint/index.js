import React, { Component } from "react";
import { TextArea, Label, Button, RadioButton } from "../../components";
import ImageUpload from "../common/ImageUpload";
import Screen from "../common/Screen";
import "./index.css";

const styles = {
  labelStyle: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#767676",
    letterSpacing: "0.3px",
    marginBottom: "26px",
  },
  hintStyle: {
    color: "#b3b3b3",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "400",
    letterSpacing: "0.3px",
  },
  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px",
  },
  selectedLabelStyle: {
    color: "#00bbd3",
  },
  radioButtonLabelStyle: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#767676",
    letterSpacing: "0.3px",
  },
};
class ReOpenComplaint extends Component {
  state = {
    valueSelected: "",
  };
  options = [
    { value: "No work was done", label: "No work was done" },
    { value: "Only partial work was done ", label: "Only partial work was done " },
    { value: "Employee did not turn up", label: "Employee did not turn up" },
    { value: "No permanent solution", label: "No permanent solution" },
  ];

  handleChange = (event, value) => {
    this.setState({ valueSelected: value });
  };
  handleComplaintSubmit = () => {
    //console.log("submitted");
  };
  handleCommentChange = () => {
    //console.log("changed");
  };

  render() {
    const { valueSelected } = this.state;

    return (
      <Screen className="reopencomplaint-field">
        <div className="reopencomplaint-question">
          <Label label="Why do you want to Re-Open your Complaint?" labelStyle={styles.labelStyle} />
          <RadioButton
            name="reopencomplaint-radio"
            valueSelected={valueSelected}
            options={this.options}
            handleChange={this.handleChange}
            radioButtonItemStyle={styles.radioButtonItemStyle}
            labelStyle={styles.radioButtonLabelStyle}
            selectedLabelStyle={styles.selectedLabelStyle}
          />
        </div>
      <div className="reopencomplaint-upload-photo">
          <ImageUpload />
        </div>

        <div className="reopencomplaint-textArea">
          <TextArea
            id="reopencomplaint-comment-field"
            hintText="Type your comments"
            hintStyle={styles.hintStyle}
            rowsMax={2}
            onChange={this.handleCommentChange}
            underlineShow={true}
            underlineStyle={{ borderColor: "#e0e0e0" }}
            underlineFocusStyle={{ borderColor: "#e0e0e0" }}
          />
        </div>
        <div className="reopencomplaint-button">
          <Button id="reopencomplaint-submit-action" primary={true} label="SUBMIT" fullWidth={true} onClick={this.handleComplaintSubmit} />
        </div>
      </Screen>
    );
  }
}

export default ReOpenComplaint;
