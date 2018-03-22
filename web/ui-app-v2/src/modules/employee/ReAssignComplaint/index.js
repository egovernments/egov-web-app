import React, { Component } from "react";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import Question from "../../common/ReOpenComplaint/components/Question";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import "./index.css";

class ReAssignComplaint extends Component {
  options = [
    { value: "Not my Department", label: "Not my Department" },
    { value: "Not my Jurisdiction", label: "Not my Jurisdiction" },
    { value: "Absent or Leave", label: "Absent or Leave" },
    { value: "Not a valid Complaint", label: "Not a valid Complaint" },
  ];

  handleComplaintReassigned = () => {
    this.props.history.push("/citizen/complaint-submitted");
  };

  render() {
    const { handleComplaintReassigned } = this;

    return (
      <Screen className="reassigncomplaint-field">
        <div className="reassigncomplaint-question">
          <Question options={this.options} label={"Why do you want this complaint to be Re-Assined?"} />
        </div>
        <div className="reassigncomplaint-textArea">
          <TextArea />
        </div>
        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reassigncomplaint-button">
          <Button
            id="reassigncomplaint-submit-action"
            primary={true}
            label="REQUEST RE-ASSIGN"
            fullWidth={true}
            onClick={handleComplaintReassigned}
          />
        </div>
      </Screen>
    );
  }
}

export default ReAssignComplaint;
