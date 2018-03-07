import React, { Component } from "react";
import RadioButton from "../../components/RadioButton";
import TextArea from "../../components/TextArea";
import { Label, Icon } from "../../components";
import ProfileSection from "../../components/ProfileSection";
import Check from "material-ui/svg-icons/navigation/check";
import "./index.css";

class ReOpenComplaint extends Component {
  options = [
    { value: "Complaint has not Resolved", label: "Complaint has not Resolved" },
    { value: "Complaint has been wrongly Rejected", label: "Complaint has been wrongly Rejected" },
    { value: "Other", label: "Other" },
  ];

  render() {
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8" style={{ padding: "0px" }}>
        <div className="reopencomplaint-field">
          <Label className="reopencomplaint-label" label="Why do you want to Re-Open your Complaint?" />
          <RadioButton
            className="reopencomplaint-radio"
            name="reopencomplaint-radio"
            checkedIcon={<Check style={{ fill: "#ffffff", background: "#73b332", borderRadius: "100%" }} />}
            options={this.options}
          />
        </div>

        <div className="reopencomplaint-textField">
          <TextArea label="Test" disabled={false} hide={false} />
        </div>
      </div>
    );
  }
}

export default ReOpenComplaint;
