import React, { Component } from "react";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import Label from "utils/translationNode";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import "./index.css";
class ReassignSuccess extends Component {
  handleComplaintReassigned = () => {
    this.props.history.push("/employee/all-complaints");
  };

  render() {
    let officerName = "Amrinder Singh";
    let department = "Department 1";
    return (
      <div className="reassign-success-main-screen">
        <SuccessMessage
          successmessage="You have assigned this complaint to"
          secondaryLabel={officerName}
          tertiaryLabel={department}
          containerStyle={{
            display: "inline-block",
          }}
        />
        <div className="reassign-success-continue">
          <Button id="resolve-success-continue" primary={true} label="CONTINUE" fullWidth={true} onClick={this.handleComplaintReassigned} />
        </div>
      </div>
    );
  }
}

export default ReassignSuccess;
