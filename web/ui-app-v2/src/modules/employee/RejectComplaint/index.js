import React, { Component } from "react";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import Question from "../../common/ReOpenComplaint/components/Question";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import "./index.css";

class RejectComplaint extends Component {
  options = [
    { value: "Not a valid complaint", label: "Not a valid complaint" },
    { value: "Out of operational scope", label: "Out of operational scope" },
    { value: "Operation already underway", label: "Operation already underway" },
    { value: "Other", label: "Other " },
  ];

  onSubmit = () => {
    //this.props.history.push("/employee/reassign-success");
  };

  render() {
    const { onSubmit } = this;
    return (
      <Screen className="reject-complaint-main-container">
        <div>
          <div className="reject-complaint-question">
            <Question options={this.options} label={"Why do you want this complaint to be Re-Assined?"} />
          </div>
          <div className="reject-complaint-textArea">
            <TextArea hintText={"Type your comments"} />
          </div>
        </div>

        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reject-complaint-button">
          <Button id="rejectcomplaint-submit-action" primary={true} label={"SUBMIT"} fullWidth={true} onClick={onSubmit} />
        </div>
      </Screen>
    );
  }
}

export default RejectComplaint;
