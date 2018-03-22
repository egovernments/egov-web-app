import React, { Component } from "react";
import { Button } from "../../../components";
import ImageUpload from "../../common/ImageUpload";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import Screen from "../../common/Screen";

class ComplaintResolved extends Component {
  options = [
    { value: "Not my Department", label: "Not my Department" },
    { value: "Not my Jurisdiction", label: "Not my Jurisdiction" },
    { value: "Absent or Leave", label: "Absent or Leave" },
    { value: "Not a valid Complaint", label: "Not a valid Complaint" },
  ];

  handleComplaintResolved = () => {
    this.props.history.push("/citizen/complaint-submitted");
  };

  render() {
    const { handleComplaintResolved } = this;

    return (
      <Screen className="reassigncomplaint-field">
        <ImageUpload />
        <div style={{ padding: "24px 16px 350px 1px" }}>
          <TextArea />
        </div>
        <div className="reassigncomplaint-button">
          <Button id="reassigncomplaint-submit-action" primary={true} label="MARK RESOLVED" fullWidth={true} onClick={handleComplaintResolved} />
        </div>
      </Screen>
    );
  }
}

export default ComplaintResolved;
