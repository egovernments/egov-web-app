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

  onSubmit = () => {
    this.props.history.push("/employee/reassign-success");
  };

  render() {
    const { onSubmit } = this;
    return (
      <Screen className="reassign-complaint-main-container">
        <div>
          <div className="reassign-complaint-question">
            <Question options={this.options} label={"Why do you want this complaint to be Re-Assined?"} />
          </div>
          <div className="reassign-complaint-textArea">
            <TextArea hintText={"Type your comments"} />
          </div>
        </div>

        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reassign-complaint-button">
          <Button id="reassigncomplaint-submit-action" primary={true} label={"REQUEST RE-ASSIGN"} fullWidth={true} onClick={onSubmit} />
        </div>
      </Screen>
    );
  }
}

export default ReAssignComplaint;
