import React, { Component } from "react";
import { Tabs } from "../../../components";
import Screen from "../../common/Screen";
import Complaints from "../../common/Complaints";
import { fetchComplaints } from "redux/complaints/actions";
import { fetchEmployees, fetchCitizens } from "redux/common/actions";
import { setRoute } from "redux/app/actions";
import Label from "utils/translationNode";
import { mapCompIDToName, isImage, getTransformedStatus, getNameFromId } from "utils/commons";
import { connect } from "react-redux";
import orderby from "lodash/orderBy";
import "./index.css";

class AllComplaints extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { fetchComplaints, fetchCitizens, fetchEmployees, } = this.props;
    fetchEmployees();
    fetchCitizens({ tenantId: localStorage.getItem("tenant-id"), id: [] });
    fetchComplaints([{key:"status",value:"assigned,open,reassignrequested"}]);
  }

  componentWillReceiveProps = (nextProps) => {};

  //Don't Delete
  handleTabChange = (label) => {
    console.log(label);
  };

  onComplaintClick = (complaintNo) => {
    let { setRoute } = this.props;
    setRoute(`/employee/complaint-details/${complaintNo}`);
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
        onActive={this.handleTabChange}
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
                  <Complaints onComplaintClick={onComplaintClick} complaints={unassignedComplaints} complaintLocation={true} role={role} />
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
                  <Complaints onComplaintClick={onComplaintClick} complaints={assignedComplaints} complaintLocation={true} role={role} />
                </div>
              </Screen>
            ),
          },
        ]}
      />
    ) : (
      <Screen loading={loading}>
        <Complaints onComplaintClick={onComplaintClick} complaints={employeeComplaints} role={role} complaintLocation={true} />
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

const isAssigningOfficer = (roles) => {
  const roleCodes = roles.map((role, index) => {
    return role.code;
  });
  return roleCodes.indexOf("GRO") > -1 ? true : false;
};

const displayStatus = (status = "", assignee) => {
  let statusObj = {};
  if (status.toLowerCase() == "closed") {
    statusObj.status = "CS_COMMON_CLOSED_UCASE";
  } else {
    statusObj.status = "CS_COMMON_OPEN_UCASE";
  }
  if (status.toLowerCase() == "open") {
    statusObj.statusMessage = `CS_COMMON_SUBMITTED`;
  } else {
    statusObj.statusMessage = `CS_COMMON_${status.toUpperCase()}`;
  }

  return statusObj;
};

const mapCitizenIdToName = (citizenObjById, id) => {
  return citizenObjById && citizenObjById[id] ? citizenObjById[id].name : "NA";
};

const findLatestAssignee = (actionArray) => {
  for (var i = 0; i < actionArray.length; i++) {
    if (actionArray[i].status === "assigned") {
      var assignee = actionArray[i].assignee;
      break;
    }
  }
  return assignee;
};

const mapStateToProps = (state) => {
  const { complaints, common } = state || {};
  const { loading } = complaints || false;
  const { citizenById, employeeById } = common || {};
  const { userInfo } = state.auth;
  const role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  const defaultPhoneNumber = "";
  const transformedComplaints = Object.values(complaints.byId).map((complaintDetail, index) => {
    return {
      header: mapCompIDToName(complaints.categoriesById, complaintDetail.serviceCode),
      date: complaintDetail.auditDetails.createdTime,
      status: displayStatus(complaintDetail.status),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).filter((imageSource) => isImage(imageSource)),
      complaintStatus: complaintDetail.status && getTransformedStatus(complaintDetail.status),
      address: complaintDetail.address ? complaintDetail.address : "Error fetching address",
      reassign: complaintDetail.status === "reassignrequested" ? true : false,
      reassignRequestedBy:
        complaintDetail.status === "reassignrequested" ? getNameFromId(employeeById, complaintDetail.actions[0].by.split(":")[0], "NA") : "NA",
      submittedBy: complaintDetail && mapCitizenIdToName(citizenById, complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[0]),
      assignedTo: complaintDetail && getNameFromId(employeeById, findLatestAssignee(complaintDetail.actions), "NA"),
      employeePhoneNumber:employeeById && employeeById[findLatestAssignee(complaintDetail.actions)]
        ? employeeById[findLatestAssignee(complaintDetail.actions)].mobileNumber
        : defaultPhoneNumber,
    };
  });
  let assignedComplaints=[],unassignedComplaints=[],employeeComplaints=[];
  if (role==="ao") {
    assignedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED"), ["date"], ["desc"]);
    unassignedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "UNASSIGNED"), ["date"], ["desc"]);
  } else {
    employeeComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED"), ["date"], ["desc"]);
  }

  return { userInfo, assignedComplaints, unassignedComplaints, employeeComplaints, role, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
    fetchCitizens: (requestBody) => dispatch(fetchCitizens(requestBody)),
    fetchEmployees: () => dispatch(fetchEmployees()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllComplaints);
