import React, { Component } from "react";
import { Button } from "../../../components";
import ImageUpload from "../../common/ImageUpload";
import Screen from "../../common/Screen";
import Question from "../../common/ReOpenComplaint/components/Question";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import Label from "utils/translationNode";
import "./index.css";

class ReOpenComplaint extends Component {
  options = [
    { value: "No work was done", label: <Label label="CS_REOPEN_OPTION_ONE" /> },
    { value: "Only partial work was done ", label: <Label label="CS_REOPEN_OPTION_TWO" /> },
    { value: "Employee did not turn up", label: <Label label="CS_REOPEN_OPTION_THREE" /> },
    { value: "No permanent solution", label: <Label label="CS_REOPEN_OPTION_FOUR" /> },
  ];

  handleComplaintSubmit = () => {
    this.props.history.push("/citizen/complaint-submitted");
  };

  render() {
    const { handleComplaintSubmit } = this;
    return (
      <Screen className="reopencomplaint-field">
        <div className="reopencomplaint-question">
          <Question options={this.options} label="CS_REOPEN_COMPLAINT_WHY" />
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
