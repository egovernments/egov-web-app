import React, { Component } from "react";
import { Button, Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { SuccessMessage } from "modules/common";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import { connect } from "react-redux";
//import "modules/common/common/SuccessMessage/components/successmessage/index.css";

class ComplaintAssigned extends Component {
  componentDidMount = () => {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
  };

  handleComplaintReassigned = () => {
    this.props.history.push("/employee/all-complaints");
  };

  render() {
    let { employeeDetails } = this.props;
    const isReassign = window.location.href.includes("complaint-reassigned") ? true : false;
    return (
      <div className="success-message-main-screen">
        {employeeDetails &&
          employeeDetails.employeeName && (
            <SuccessMessage
              successmessage={employeeDetails.employeeName && (isReassign ? "Re-Assigned to " : "Assigned to ") + employeeDetails.employeeName}
              secondaryLabel={employeeDetails && employeeDetails.employeeDesignation && employeeDetails.employeeDesignation}
              tertiaryLabel={employeeDetails && employeeDetails.employeeDepartment && employeeDetails.employeeDepartment + " Department"}
              icon={<Icon action="navigation" name="check" />}
              backgroundColor={"#22b25f"}
            />
          )}
        <div className="responsive-action-button-cont">
          <Button
            id="resolve-success-continue"
            primary={true}
            label={<Label buttonLabel={true} label="CORE_COMMON_GOTOHOME" />}
            fullWidth={true}
            onClick={this.handleComplaintReassigned}
            className="responsive-action-button"
          />
        </div>
      </div>
    );
  }
}

const getNameFromId = (obj, id, defaultValue) => {
  return obj && id && obj[id] ? obj[id].name : defaultValue;
};

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  const { departmentById, designationsById, employeeById } = state.common;
  let selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  const selectedEmployee = employeeById[selectedComplaint.actions[0].assignee];
  const employeeDetails = {
    employeeName: selectedEmployee && selectedEmployee.name,
    employeeDesignation: selectedEmployee && getNameFromId(designationsById, selectedEmployee.assignments[0].designation, "Engineer"),
    employeeDepartment: selectedEmployee && getNameFromId(departmentById, selectedEmployee.assignments[0].department, "Administration"),
  };
  return { employeeDetails };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplaintAssigned);
