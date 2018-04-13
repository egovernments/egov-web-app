import React, { Component } from "react";
import { Tabs, Label } from "../../../components";
import Screen from "../../common/Screen";
import Complaints from "../../common/Complaints";
import Garbage_1 from "../../../assets/images/Garbage_1.jpg";
import Garbage_2 from "../../../assets/images/Garbage_2.jpg";
import Garbage_3 from "../../../assets/images/Garbage_3.jpg";
import Potholes_1 from "../../../assets/images/Potholes_1.png";
import Potholes_2 from "../../../assets/images/Potholes_2.jpg";
import Potholes_3 from "../../../assets/images/Potholes_3.jpg";
import { fetchComplaints } from "redux/complaints/actions";
import { setRoute } from "redux/app/actions";
import { mapCompIDToName, isImage,fetchImages } from "utils/commons";
import { connect } from "react-redux";
import orderby from "lodash/orderBy";
import "./index.css";

class AllComplaints extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { fetchComplaints } = this.props;
    fetchComplaints([]);
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
            label: <Label color={"#ffffff"} bold={true} label={`UNASSIGNED (${unassignedComplaints.length})`} labelStyle={tabStyle} />,
            children: (
              <Screen loading={loading}>
                <div className="tab1-content">
                  <Complaints onComplaintClick={onComplaintClick} complaints={unassignedComplaints} complaintLocation={true} role={role} />
                </div>
              </Screen>
            ),
          },
          {
            label: <Label color={"#ffffff"} bold={true} label={`ASSIGNED (${assignedComplaints.length})`} labelStyle={tabStyle} />,
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

const getLatestStatus = (status) => {
  let transformedStatus = "";
  switch (status.toLowerCase()) {
    case "open":
    case "new":
    case "reassignrequested":
      transformedStatus = "UNASSIGNED";
      break;
    case "resolved":
    case "rejected":
    case "closed":
      transformedStatus = "CLOSED";
      break;
    case "assigned":
      transformedStatus = "ASSIGNED";
      break;
    default:
      transformedStatus = "UNASSIGNED";
      break;
  }
  return transformedStatus;
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

const mapStateToProps = (state) => {
  const { complaints, common } = state || {};
  const { loading } = complaints || false;
  const { citizenById } = common || {};
  const { userInfo } = state.auth;
  const role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  const transformedComplaints = Object.values(complaints.byId).map((complaintDetail, index) => {
    return {
      header: mapCompIDToName(complaints.categoriesById, complaintDetail.serviceCode),
      date: complaintDetail.auditDetails.createdTime,
      status: displayStatus(complaintDetail.actions[0].status),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).filter((imageSource) => isImage(imageSource)),
      complaintStatus: complaintDetail.status && getLatestStatus(complaintDetail.status),
      address: complaintDetail.address ? complaintDetail.address : "Error fetching address",
      submittedBy: complaintDetail && mapCitizenIdToName(citizenById, complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[0]),
    };
  });
  const assignedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED"), ["date"], ["desc"]);
  const unassignedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "UNASSIGNED"), ["date"], ["desc"]);
  const employeeComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED"), ["date"], ["desc"]);
  return { userInfo, assignedComplaints, unassignedComplaints, employeeComplaints, role, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllComplaints);
