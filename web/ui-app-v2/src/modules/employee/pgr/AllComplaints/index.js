import React, { Component } from "react";
import { Tabs } from "components";
import Screen from "modules/common/Screen";
import Complaints from "modules/common/Complaints";
import { fetchComplaints } from "redux/complaints/actions";
import Label from "utils/translationNode";
import { mapCompIDToName, isImage, getTransformedStatus, returnSLAStatus, getPropertyFromObj, getLatestCreationTime } from "utils/commons";
import { connect } from "react-redux";
import orderby from "lodash/orderBy";
import "./index.css";

class AllComplaints extends Component {
  componentDidMount() {
    let { fetchComplaints } = this.props;
    fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }]);
  }

  onComplaintClick = (complaintNo) => {
    this.props.history.push(`/employee/complaint-details/${complaintNo}`);
  };

  render() {
    const { loading } = this.props;
    const tabStyle = {
      letterSpacing: "0.6px",
    };
    const { onComplaintClick } = this;
    const { assignedComplaints, unassignedComplaints, employeeComplaints, role } = this.props;
    return role === "ao" ? (
      <Tabs
        className="employee-complaints-tab"
        tabs={[
          {
            label: (
              <div className="inline-Localization-text">
                <Label color={"#ffffff"} bold={true} label={`ES_ALL_COMPLAINTS_UNASSIGNED_TAB_LABEL`} labelStyle={tabStyle} />
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
                <Label color={"#ffffff"} bold={true} label={`ES_ALL_COMPLAINTS_ASSIGNED_TAB_LABEL`} labelStyle={tabStyle} />
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

//better implementation ==> to be done later
const fetchImages = (actionArray) => {
  let imageArray = [];
  actionArray.forEach((action, index) => {
    action.media && imageArray.push(action.media);
  });
  return imageArray[0] ? imageArray[0] : [];
};

const isAssigningOfficer = (roles = []) => {
  const roleCodes = roles.map((role, index) => {
    return role.code;
  });
  return roleCodes && roleCodes.length && roleCodes.indexOf("GRO") > -1 ? true : false;
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

const mapCitizenIdToName = (citizenObjById, id) => {
  return citizenObjById && citizenObjById[id] ? citizenObjById[id].name : "NA";
};

const findLatestAssignee = (actionArray) => {
  for (let i = 0; i < actionArray.length; i++) {
    if (actionArray[i].status === "assigned") {
      return actionArray[i].assignee;
    }
  }
};

const mapStateToProps = (state) => {
  const { complaints, common } = state || {};
  const { categoriesById } = complaints;
  const { loading } = complaints || false;
  const { citizenById, employeeById } = common || {};
  const { userInfo } = state.auth;
  const role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  const defaultPhoneNumber = "";
  const transformedComplaints = Object.values(complaints.byId).map((complaintDetail, index) => {
    return {
      header: mapCompIDToName(complaints.categoriesById, complaintDetail.serviceCode),
      date: complaintDetail.auditDetails.createdTime,
      latestCreationTime: getLatestCreationTime(complaintDetail),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).filter((imageSource) => isImage(imageSource)),
      complaintStatus: complaintDetail.status && getTransformedStatus(complaintDetail.status),
      address: complaintDetail.address ? complaintDetail.address : "Error fetching address",
      reassign: complaintDetail.status === "reassignrequested" ? true : false,
      reassignRequestedBy:
        complaintDetail.status === "reassignrequested"
          ? getPropertyFromObj(employeeById, complaintDetail.actions[0].by.split(":")[0], "name", "NA")
          : "NA",
      submittedBy: complaintDetail && mapCitizenIdToName(citizenById, complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[0]),
      assignedTo: complaintDetail && getPropertyFromObj(employeeById, findLatestAssignee(complaintDetail.actions), "name", "NA"),
      employeePhoneNumber:
        employeeById && employeeById[findLatestAssignee(complaintDetail.actions)]
          ? employeeById[findLatestAssignee(complaintDetail.actions)].mobileNumber
          : defaultPhoneNumber,
      status: displayStatus(
        returnSLAStatus(getPropertyFromObj(categoriesById, complaintDetail.serviceCode, "slaHours", "NA"), getLatestCreationTime(complaintDetail))
      ),
    };
  });
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

  return { assignedComplaints, unassignedComplaints, employeeComplaints, role, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllComplaints);
