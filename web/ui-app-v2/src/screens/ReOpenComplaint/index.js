import React, { Component } from "react";
import RadioButton from "../../components/RadioButton";
import TextArea from "../../components/TextArea";
import { Label, Icon, Button } from "../../components";
import ProfileSection from "../../components/ProfileSection";
import Check from "material-ui/svg-icons/navigation/check";
import "./index.css";
const styles = {
  labelStyle: {
    paddingBottom: "16px",
    paddingLeft: "24px",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#484848",
  },
  checkedIconStyle: { fill: "#ffffff", background: "#73b332", borderRadius: "50%" },
  textareaStyle: { border: " 0.5px solid #e6e6e6", backgroundColor: "#ffffff", height: "106px" },
  hintStyle: { color: "#969696", fontSize: "14px", top: "10px", left: "5px", bottom: "0px" },
};
class ReOpenComplaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "green",
    };
  }
  options = [
    { value: "Complaint has not Resolved", label: "Complaint has not Resolved" },
    { value: "Complaint has been wrongly Rejected", label: "Complaint has been wrongly Rejected" },
    { value: "Other", label: "Other" },
  ];
  handleChange = (event) => {
    this.options.map((option) => {
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
    this.options.map((option) => {
      option.style = {
        fontSize: "14px",
        fontWeight: "bold",
        paddingBottom: "12px",
        color: "#484848",
        paddingLeft: "24px",
        height: "48px",
        paddingTop: "15px",
        lineHeight: "normal",
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
          />
        </div>

        <div className="reopencomplaint-textArea">
          <TextArea
            id="reopencomplaint-comment-field"
            hintText="Write your comments..."
            rows={5}
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
