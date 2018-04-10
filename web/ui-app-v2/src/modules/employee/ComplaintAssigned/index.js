import React, { Component } from "react";
import { Button, Icon } from "components";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import "modules/common/SuccessMessage/components/successmessage/index.css";

class ComplaintAssigned extends Component {
  handleComplaintReassigned = () => {
    this.props.history.push("/employee/all-complaints");
  };

  render() {
    let designation = "Senior Inspector";
    let department = "Health & Sanitation Department";
    return (
      <div className="reassign-success-main-screen">
        <SuccessMessage
          successmessage="Assigned to Amrinder Singh"
          secondaryLabel={designation}
          tertiaryLabel={department}
          icon={<Icon action="navigation" name="check" />}
          backgroundColor={"#22b25f"}
        />
        <div className="reassign-success-continue">
          <Button id="resolve-success-continue" primary={true} label="GO TO HOME" fullWidth={true} onClick={this.handleComplaintReassigned} />
        </div>
      </div>
    );
  }
}

export default ComplaintAssigned;
