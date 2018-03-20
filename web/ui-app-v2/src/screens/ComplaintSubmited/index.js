import React, { Component } from "react";
import { Card, Label, Icon, Button } from "../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Screen from "../common/Screen";
import "./index.css";

class ComplaintDetails extends Component {
  continueComplaintSubmit = () => {
    this.props.history.push("/");
  };
  render() {
    let complaintnumber = 25436789;
    return (
      <div>
        <Screen className="complaint-submitted-card">
          <div className="complaint-submitted-boldlabel">
            <Label label={"Complaint registered successfully"} fontSize="16px" />
            <FloatingActionButton backgroundColor="#22b25f" style={{ marginBottom: "16px" }}>
              <Icon name={"check"} action={"navigation"} />
            </FloatingActionButton>
            <Label label={"Thank You!"} fontSize="16px" />
            <Label label={`Complaint No. ${complaintnumber}`} fontSize="16px" />
          </div>
          <div className="complaint-submitted-label">
            <Label label={`You can track the status of your complaint on this app anytime!`} />
          </div>
          <div className="complaintsubmit-button">
            <Button id="complaint-submit-action" primary={true} label="CONTINUE" fullWidth={true} onClick={this.continueComplaintSubmit} />
          </div>
        </Screen>
      </div>
    );
  }
}

export default ComplaintDetails;
