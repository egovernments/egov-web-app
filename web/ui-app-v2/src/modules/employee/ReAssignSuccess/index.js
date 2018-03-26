import React, { Component } from "react";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import "./index.css";
class ReassignSuccess extends Component {
  handleComplaintReassigned = () => {
    this.props.history.push("/citizen");
  };
  render() {
    let officerName = "Amrinder Singh";
    let department = "Department 1";
    return (
      <Screen>
        <SuccessMessage successmessage={`You have assigned this complaint to ${officerName} ${department}`} />
        <div className="reassignsuccess-button">
          <Button id="reassignsuccess-continue" primary={true} label="CONTINUE" fullWidth={true} onClick={this.handleComplaintReassigned} />
        </div>
      </Screen>
    );
  }
}

export default ReassignSuccess;
