import React, { Component } from "react";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import Question from "../../common/ReOpenComplaint/components/Question";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import "./index.css";

class ReAssignComplaint extends Component {
  options = [
    { value: "Not my Department", label: "Not my Department" },
    { value: "Not my Jurisdiction", label: "Not my Jurisdiction" },
    { value: "Absent or Leave", label: "Absent or Leave" },
    { value: "Not a valid Complaint", label: "Not a valid Complaint" },
  ];

  state = {
    submitted: false,
  };

  onSubmit = () => {
    if (this.state.submitted === false) {
      this.setState({ submitted: true });
    } else {
      this.props.history.push("/citizen");
    }
  };

  render() {
    const { onSubmit } = this;
    const { submitted } = this.state;
    let officerName = "Amrinder Singh";
    let department = "Department 1";
    return (
      <Screen className="reassign-complaint-main-container">
        {!submitted ? (
          <div>
            <div className="reassign-complaint-question">
              <Question options={this.options} label={"Why do you want this complaint to be Re-Assined?"} />
            </div>
            <div className="reassign-complaint-textArea">
              <TextArea />
            </div>
          </div>
        ) : (
          <SuccessMessage successmessage={`You have assigned this complaint to ${officerName} ${department}`} />
        )}
        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reassign-complaint-button">
          <Button
            id="reassigncomplaint-submit-action"
            primary={true}
            label={submitted ? "CONTINUE" : "REQUEST RE-ASSIGN"}
            fullWidth={true}
            onClick={onSubmit}
          />
        </div>
      </Screen>
    );
  }
}

export default ReAssignComplaint;
