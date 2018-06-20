import React, { Component } from "react";
import { Tabs, Card, TextField, Icon, Button } from "components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Screen } from "modules/common";
import { Complaints } from "modules/common";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { transformComplaintForComponent } from "egov-ui-kit/utils/commons";
import { connect } from "react-redux";
import orderby from "lodash/orderBy";
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

  onSearch = () => {
    const { complaintNo, mobileNo } = this.state;
    const { fetchComplaints } = this.props;
    if (complaintNo || mobileNo) {
      fetchComplaints([{ key: "serviceRequestId", value: complaintNo }, { key: "phone", value: mobileNo }], true, true);
    }
  };

  clearSearch = () => {
    const { fetchComplaints } = this.props;
    fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }]);
    this.setState({ mobileNo: "", complaintNo: "" });
  };

  render() {
    const { loading, history } = this.props;
    const { mobileNo, complaintNo } = this.state;
    const tabStyle = {
      letterSpacing: "0.6px",
    };

    const { onComplaintClick } = this;
    const { assignedComplaints, unassignedComplaints, employeeComplaints, role, transformedComplaints } = this.props;
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
        <Card
          id="complaint-search-card"
          className="complaint-search-main-card"
          textChildren={
            <div className="complaint-search-cont clearfix">
              <div className="col-xs-12" style={{ paddingLeft: 8 }}>
                <Label label="Search Complaint" fontSize={16} dark={true} bold={true} />
              </div>
              <div className="col-sm-3 col-xs-12" style={{ paddingLeft: 8 }}>
                <TextField
                  id="complaint-no"
                  name="complaint-no"
                  value={complaintNo}
                  hintText="Enter Complaint No"
                  floatingLabelText="Complaint No."
                  onChange={(e, value) => this.onComplaintChange(e)}
                  underlineStyle={{ bottom: 7 }}
                  underlineFocusStyle={{ bottom: 7 }}
                />
              </div>
              <div className="col-sm-3 col-xs-12" style={{ paddingLeft: 8 }}>
                <TextField
                  id="mobile-no"
                  name="mobile-no"
                  value={mobileNo}
                  hintText="Enter Complainant Mobile No"
                  floatingLabelText="Complainant Mobile No."
                  onChange={(e, value) => this.onMobileChange(e)}
                  underlineStyle={{ bottom: 7 }}
                  underlineFocusStyle={{ bottom: 7 }}
                />
              </div>
              <div className="col-sm-6 col-xs-12 csr-action-buttons" style={{ marginTop: 10, paddingRight: 8 }}>
                <Button
                  label={"SEARCH"}
                  style={{ marginRight: 45, width: "36%" }}
                  backgroundColor="#fe7a51"
                  labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
                  buttonStyle={{ border: 0 }}
                  onClick={() => this.onSearch()}
                />
                <Button
                  label={"CLEAR SEARCH"}
                  labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
                  buttonStyle={{ border: "1px solid #fe7a51" }}
                  style={{ width: "36%" }}
                  onClick={() => this.clearSearch()}
                />
              </div>
            </div>
          }
        />
        <Complaints
          noComplaintMessage={"No complaints assigned to you !!"}
          onComplaintClick={onComplaintClick}
          complaints={transformedComplaints}
          role={role}
          complaintLocation={true}
        />
        <div className="floating-button-cont csr-add-button">
          <FloatingActionButton
            id="mycomplaints-add"
            onClick={(e) => {
              history.push("/employee/create-complaint");
            }}
            className="floating-button"
            backgroundColor="#fe7a51"
          >
            <Icon action="content" name="add" />
          </FloatingActionButton>
        </div>
      </Screen>
    ) : (
      <Screen loading={loading}>
        <Complaints
          noComplaintMessage={"No complaints assigned to you !!"}
          onComplaintClick={onComplaintClick}
          complaints={employeeComplaints}
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
    fetchComplaints: (criteria, hasUsers, overWrite) => dispatch(fetchComplaints(criteria, hasUsers, overWrite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllComplaints);
