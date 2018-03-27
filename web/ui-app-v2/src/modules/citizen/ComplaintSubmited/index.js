import React, { Component } from "react";
import { Label, Icon, Button } from "../../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Screen from "../../common/Screen";
import "./index.css";

class ComplaintDetails extends Component {
  continueComplaintSubmit = () => {
    this.props.history.push("/citizen");
  };
  render() {
    let complaintnumber = "25436789";
    return (
      <div>
        <Screen className="complaint-submitted-card">
          <div className="complaint-submitted-boldlabel">
            <Label label={"Complaint registered successfully"} fontSize="16px" />
            <FloatingActionButton backgroundColor="#22b25f" style={{ marginBottom: "16px" }}>
              <Icon name={"check"} action={"navigation"} />
            </FloatingActionButton>
            <Label id="thank-you-text" label={"Thank You!"} fontSize="16px" />
            <div className="complaint-submitted-complaintNo-cont">
              <Label label={"Complaint No. "} fontSize="16px" />
              <Label className="complaint-number-value" label={complaintnumber} />
            </div>
          </div>
          <div className="complaint-submitted-label">
            <Label id="complaint-submitted-success-message" label={`You can track the status of your complaint on this app anytime!`} />
          </div>
          <div className="complaintsubmit-button col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6">
            <Button id="complaint-submitted-continue" primary={true} label="CONTINUE" fullWidth={true} onClick={this.continueComplaintSubmit} />
          </div>
        </Screen>
      </div>
    );
  }
}

export default ComplaintDetails;
