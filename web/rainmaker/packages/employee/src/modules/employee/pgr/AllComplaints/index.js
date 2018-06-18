import React, { Component } from "react";
import { Tabs, Card, TextField } from "components";
import { Screen } from "modules/common";
import { Complaints } from "modules/common";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { transformComplaintForComponent } from "egov-ui-kit/utils/commons";
import { connect } from "react-redux";
import orderby from "lodash/orderBy";
import isEqual from "lodash/isEqual";
import get from "lodash/get";

import differenceWith from "lodash/differenceWith";
import "./index.css";

class AllComplaints extends Component {
  state = {
    complaintNo: "",
    mobileNo: "",
    complaints: [],
  };
  componentDidMount() {
    let { fetchComplaints } = this.props;
    fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }]);
    this.setState({ complaints: this.props.transformedComplaints });
  }

  onComplaintClick = (complaintNo) => {
    this.props.history.push(`/employee/complaint-details/${complaintNo}`);
  };

  onComplaintChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ complaintNo: inputValue });
  };

  onMobileChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ mobileNo: inputValue });
  };

  // fetchSuggestions = () => {
  //   const { mobileNo, complaintNo } = this.state;
  //   const { transformedComplaints } = this.props;
  //   if (mobileNo.length || complaintNo.length) {
  //     return transformedComplaints.filter((result) => this.filterSuggestions(result, mobileNo, complaintNo));
  //   }
  // };

  // filterSuggestions = (suggestions, mobileNo, complaintNo) => {
  //   const filteredByComplaintNo = get(suggestions, "complaintNo");
  //   const filteredByMobileNo = get(suggestions, "citizenPhoneNumber");
  //   return (
  //     filteredByComplaintNo
  //       .toLowerCase()
  //       .replace(/\s+/g, "")
  //       .indexOf(complaintNo) !== -1 &&
  //     filteredByMobileNo
  //       .toLowerCase()
  //       .replace(/\s+/g, "")
  //       .indexOf(mobileNo) !== -1
  //   );
  // };

  render() {
    const { loading } = this.props;
    const { mobileNo, complaintNo, complaints } = this.state;
    const tabStyle = {
      letterSpacing: "0.6px",
    };

    const { onComplaintClick } = this;
    const { assignedComplaints, unassignedComplaints, employeeComplaints, role, transformedComplaints } = this.props;
    let filteredComplaints = transformedComplaints;
    if (mobileNo || complaintNo) {
      filteredComplaints = filteredComplaints.filter((result) => {
        return (
          result.complaintNo
            .toLowerCase()
            .replace(/\s+/g, "")
            .indexOf(complaintNo) !== -1 &&
          result.citizenPhoneNumber
            .toLowerCase()
            .replace(/\s+/g, "")
            .indexOf(mobileNo) !== -1
        );
      });
    }
    return role === "ao" ? (
      <Tabs
        className="employee-complaints-tab"
        tabs={[
          {
            label: (
              <div className="inline-Localization-text">
                <Label
                  labelClassName="unassigned-label-text"
                  color={"#ffffff"}
                  bold={true}
                  label={`ES_ALL_COMPLAINTS_UNASSIGNED_TAB_LABEL`}
                  labelStyle={tabStyle}
                />
                <Label color={"#ffffff"} bold={true} label={`(${unassignedComplaints.length})`} labelStyle={tabStyle} />
              </div>
            ),
            children: (
              <Screen loading={loading}>
                <div className="tab1-content">
                  <Complaints
                    noComplaintMessage={"No complaints to Assign"}
                    onComplaintClick={onComplaintClick}
                    complaints={unassignedComplaints}
                    complaintLocation={true}
                    role={role}
                  />
                </div>
              </Screen>
            ),
          },
          {
            label: (
              <div className="inline-Localization-text">
                <Label
                  labelClassName="assigned-label-text"
                  color={"#ffffff"}
                  bold={true}
                  label={`ES_ALL_COMPLAINTS_ASSIGNED_TAB_LABEL`}
                  labelStyle={tabStyle}
                />
                <Label color={"#ffffff"} bold={true} label={`(${assignedComplaints.length})`} labelStyle={tabStyle} />
              </div>
            ),
            children: (
              <Screen loading={loading}>
                <div className="tab2-content">
                  <Complaints
                    noComplaintMessage={"No assigned complaints"}
                    onComplaintClick={onComplaintClick}
                    complaints={assignedComplaints}
                    complaintLocation={true}
                    role={role}
                  />
                </div>
              </Screen>
            ),
          },
        ]}
      />
    ) : role === "csr" ? (
      <Screen loading={loading}>
        <Complaints
          noComplaintMessage={"No complaints assigned to you !!"}
          onComplaintClick={onComplaintClick}
          complaints={employeeComplaints}
          role={role}
          complaintLocation={true}
        />
      </Screen>
    ) : (
      <Screen loading={loading}>
        <Card
          id="complaint-search-card"
          className="complaint-search-main-card"
          textChildren={
            <div className="complaint-search-cont">
              <div className="col-xs-12" style={{ paddingLeft: 8 }}>
                <Label label="Search Complaint" fontSize={16} dark={true} bold={true} />
              </div>
              <div className="col-xs-6" style={{ paddingLeft: 8 }}>
                <TextField
                  id="complaint-no"
                  name="complaint-no"
                  value={complaintNo}
                  hintText="Enter Complaint No"
                  floatingLabelText="Complaint No."
                  onChange={(e, value) => this.onComplaintChange(e)}
                />
              </div>
              <div className="col-xs-6" style={{ paddingLeft: 8 }}>
                <TextField
                  id="mobile-no"
                  name="mobile-no"
                  value={mobileNo}
                  hintText="Enter Complainant Mobile No"
                  floatingLabelText="Complainant Mobile No."
                  onChange={(e, value) => this.onMobileChange(e)}
                />
              </div>
            </div>
          }
        />
        <Complaints
          noComplaintMessage={"No complaints assigned to you !!"}
          onComplaintClick={onComplaintClick}
          complaints={filteredComplaints}
          role={role}
          complaintLocation={true}
        />
      </Screen>
    );
  }
}

const roleFromUserInfo = (roles = [], role) => {
  const roleCodes = roles.map((role, index) => {
    return role.code;
  });
  return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
};

const displayStatus = (status = "", assignee) => {
  let statusObj = {};
  if (status.includes("Overdue")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  if (status.includes("left")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  return statusObj;
};

const mapStateToProps = (state) => {
  const { complaints, common } = state || {};
  const { categoriesById } = complaints;
  const { loading } = complaints || false;
  const { citizenById, employeeById } = common || {};
  const { userInfo } = state.auth;
  const role = roleFromUserInfo(userInfo.roles, "GRO") ? "ao" : roleFromUserInfo(userInfo.roles, "CSR") ? "csr" : "employee";
  const defaultPhoneNumber = "";
  const defaultMobileNumber = "";
  const transformedComplaints = transformComplaintForComponent(complaints, role, employeeById, citizenById, categoriesById, displayStatus);
  let assignedComplaints = [],
    unassignedComplaints = [],
    employeeComplaints = [];
  if (role === "ao") {
    assignedComplaints = orderby(
      transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED"),
      ["latestCreationTime"],
      ["desc"]
    );
    unassignedComplaints = orderby(
      transformedComplaints.filter((complaint) => complaint.complaintStatus === "UNASSIGNED"),
      ["latestCreationTime"],
      ["desc"]
    );
  } else {
    employeeComplaints = orderby(
      transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED"),
      ["latestCreationTime"],
      ["desc"]
    );
  }

  return { assignedComplaints, unassignedComplaints, employeeComplaints, role, loading, transformedComplaints };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllComplaints);
