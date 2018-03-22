import React, { Component } from "react";
import { Button } from "../../../components";
import ImageUpload from "../../common/ImageUpload";
import Screen from "../../common/Screen";
import Question from "../../common/ReOpenComplaint/components/Question";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import "./index.css";

class ReOpenComplaint extends Component {
  options = [
    { value: "No work was done", label: "No work was done" },
    { value: "Only partial work was done ", label: "Only partial work was done " },
    { value: "Employee did not turn up", label: "Employee did not turn up" },
    { value: "No permanent solution", label: "No permanent solution" },
  ];

  handleComplaintSubmit = () => {
    this.props.history.push("/citizen/complaint-submitted");
  };

  render() {
    const { handleComplaintSubmit } = this;
    let label = "Why do you want to Re-Open your Complaint?";
    return (
      <Screen className="reopencomplaint-field">
        <div className="reopencomplaint-question">
          <Question options={this.options} label={label} />
        </div>
        <div className="reopencomplaint-upload-photo">
          <ImageUpload />
        </div>
        <div className="reopencomplaint-textArea">
          <TextArea />
        </div>
        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reopencomplaint-button">
          <Button id="reopencomplaint-submit-action" primary={true} label="SUBMIT" fullWidth={true} onClick={handleComplaintSubmit} />
        </div>
      </Screen>
    );
  }
}

export default ReOpenComplaint;
