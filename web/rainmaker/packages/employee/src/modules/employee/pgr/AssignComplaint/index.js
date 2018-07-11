import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import formHoc from "egov-ui-kit/hocs/form";
import AssignComplaintForm from "./components/AssignComplaintForm";
import { fetchEmployeeToAssign } from "egov-ui-kit/redux/common/actions";
import filter from "lodash/filter";

const AssignComplaintFormHOC = formHoc({ formKey: "assignComplaint" })(AssignComplaintForm);

class AssignComplaint extends Component {
  componentDidMount = () => {
    let { fetchEmployeeToAssign } = this.props;
    const queryParams = [{ key: "roleCodes", value: "EMPLOYEE" }];
    fetchEmployeeToAssign(queryParams);
  };
  render() {
    const { transformedComplaint, ...rest } = this.props;
    return (
      <Screen>
        <AssignComplaintFormHOC complaint={transformedComplaint} {...rest} />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployeeToAssign: (queryParams, requestBody) => dispatch(fetchEmployeeToAssign(queryParams, requestBody)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  const { history } = ownProps;
  const serviceRequestId = ownProps.match.params.serviceRequestId;
  const { departmentById, designationsById, employeeToAssignById } = state.common;
  const rawAPIData =
    employeeToAssignById &&
    Object.keys(employeeToAssignById).map((item, index) => {
      return employeeToAssignById[item];
    });
  let selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  const complaintTenantId = selectedComplaint && selectedComplaint.tenantId;
  const APIData = filter(rawAPIData, (item) => {
    return item.tenantId === complaintTenantId;
  });
  const transformedComplaint = {
    header: selectedComplaint && selectedComplaint.serviceCode,
    address: selectedComplaint && selectedComplaint.address,
  };
  return { designationsById, departmentById, APIData, transformedComplaint, history, serviceRequestId };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignComplaint);
