import React, { Component } from "react";
import RadioButton from "../../components/RadioButton";
import { TextArea, Label, Button } from "../../components";
import Check from "material-ui/svg-icons/navigation/check";
import "./index.css";
const styles = {
  labelStyle: {
    paddingBottom: "16px",
    paddingLeft: "24px",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#767676",
    letterSpacing: "0.3px",
  },
  checkedIconStyle: { fill: "#ffffff", background: "#73b332", borderRadius: "50%" },
  unCheckedIconStyle: { fill: "#e0e0e0", background: "#e0e0e0", borderRadius: "50%" },
  textareaStyle: { border: "0.5px solid #e6e6e6", backgroundColor: "#ffffff", paddingLeft: "5px", height: "106px" },
  hintStyle: {
    color: "#767676",
    fontSize: "14px",
    fontWeight: "normal",
    top: "10px",
    left: "5px",
    lineHeight: "20px",
    letterSpacing: "0.3px",
  },
};
class ReOpenComplaint extends Component {
  options = [
    { value: "Complaint has not Resolved", label: "Complaint has not Resolved" },
    { value: "Complaint has been wrongly Rejected", label: "Complaint has been wrongly Rejected" },
    { value: "Other", label: "Other" },
  ];

  handleChange = (event) => {
    this.options.forEach((option) => {
      if (option.value == event.target.value) {
        option.style.backgroundColor = "#f8f8f8";
        option.style.borderLeft = "1.5px solid #f5a623";
      } else {
        option.style.backgroundColor = "#ffffff";
        option.style.borderLeft = "none";
      }
    });
  };
  handleComplaintSubmit = () => {
    //console.log("submitted");
  };
  handleCommentChange = () => {
    //console.log("changed");
  };
  render() {
    this.options.forEach((option) => {
      option.style = {
        paddingBottom: "12px",
        paddingLeft: "24px",
        height: "48px",
        paddingTop: "15px",
        lineHeight: "normal",
      };
      option.labelStyle = {
        fontSize: "14px",
        fontWeight: "500",
        color: "#484848",
        letterSpacing: "0.3px",
      };
    });
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8" style={{ padding: "0px" }}>
        <div className="reopencomplaint-field">
          <Label label="Why do you want to Re-Open your Complaint?" labelStyle={styles.labelStyle} />
          <RadioButton
            id="reopencomplaint-radio"
            name="reopencomplaint-radio"
            checkedIcon={<Check style={styles.checkedIconStyle} />}
            options={this.options}
            handleChange={this.handleChange}
            iconStyle={styles.unCheckedIconStyle}
          />
        </div>

        <div className="reopencomplaint-textArea">
          <TextArea
            id="reopencomplaint-comment-field"
            hintText="Write your comments..."
            rows={4}
            style={styles.textareaStyle}
            hintStyle={styles.hintStyle}
            onChange={this.handleCommentChange}
          />
        </div>
        <div className="reopencomplaint-button">
          <Button id="reopencomplaint-submit-action" primary={true} label="SUBMIT" fullWidth={true} onClick={this.handleComplaintSubmit} />
        </div>
      </div>
    );
  }
}

export default ReOpenComplaint;
