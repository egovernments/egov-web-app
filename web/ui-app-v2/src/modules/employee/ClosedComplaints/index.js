import React, { Component } from "react";
import { Tabs, Label } from "../../../components";
import Screen from "../../common/Screen";
import Complaints from "../../common/Complaints";

import { fetchComplaints } from "redux/complaints/actions";
import { setRoute } from "redux/app/actions";
import { getDateFromEpoch, mapCompIDToName } from "utils/commons";
import { connect } from "react-redux";
import "./index.css";

class ClosedComplaints extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { fetchComplaints } = this.props;
    fetchComplaints([]);
  }

  onComplaintClick = (complaintNo) => {
    let { setRoute } = this.props;
    setRoute(`/employee/complaint-details/${complaintNo}`);
  };

  render() {
    const tabStyle = {
      letterSpacing: "0.6px",
    };
    const { onComplaintClick } = this;
    const { closedComplaints, role } = this.props;
    console.log(this.props.closedComplaints);
    return (
      <Screen>
        <Complaints onComplaintClick={onComplaintClick} complaints={closedComplaints} role={role} complaintLocation={true} />
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

const getLatestStatus = (status) => {
  let transformedStatus = "";
  switch (status.toLowerCase()) {
    case "open" || "new":
      transformedStatus = "UNASSIGNED";
      break;
    case "closed":
      transformedStatus = "CLOSED";
      break;
    case "assigned":
      transformedStatus = "ASSIGNED";
      break;
    case "resolved":
      transformedStatus = "RESOLVED";
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
  return roleCodes.indexOf("GRO" || "RO") > -1 ? true : false;
};

const displayStatus = (status = "", assignee) => {
  let statusObj = {};
  console.log("status is...." + status);
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

const mapStateToProps = (state) => {
  const { complaints } = state;
  const { userInfo } = state.auth;
  const role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  const transformedComplaints = Object.values(complaints.byId).map((complaintDetail, index) => {
    return {
      header: mapCompIDToName(complaints.categoriesById, complaintDetail.serviceCode),
      date: getDateFromEpoch(complaintDetail.auditDetails.createdTime),
      status: displayStatus(complaintDetail.actions[0].status),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).map((imageSource, index) => {
        return imageSource &&
          imageSource
            .split("?")[0]
            .split(".")
            .pop() === ("png" || "jpg" || "jpeg")
          ? { source: imageSource }
          : "";
      }),
      complaintStatus: complaintDetail.actions[0].status && getLatestStatus(complaintDetail.actions[0].status),
      address: complaintDetail.address ? complaintDetail.address : "Error fetching address",
    };
  });
  const closedComplaints = transformedComplaints.filter((complaint) => complaint.complaintStatus === "CLOSED");

  return { userInfo, closedComplaints, role };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClosedComplaints);
