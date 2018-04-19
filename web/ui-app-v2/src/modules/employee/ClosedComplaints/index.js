import React, { Component } from "react";
import Screen from "../../common/Screen";
import Complaints from "../../common/Complaints";

import { fetchComplaints } from "redux/complaints/actions";
import { setRoute } from "redux/app/actions";
import { getDateFromEpoch, mapCompIDToName, isImage, getTransformedStatus } from "utils/commons";
import { connect } from "react-redux";
import orderby from "lodash/orderBy";
import "./index.css";

class ClosedComplaints extends Component {
  componentDidMount() {
    let { fetchComplaints } = this.props;
    fetchComplaints([{key:"status",value:"rejected,resolved,closed"}]);
  }

  onComplaintClick = (complaintNo) => {
    let { setRoute } = this.props;
    setRoute(`/employee/complaint-details/${complaintNo}`);
  };

  render() {
    const { onComplaintClick } = this;
    const { closedComplaints, role } = this.props;
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
    case "open":
    case "new":
      transformedStatus = "UNASSIGNED";
      break;
    case "closed":
    case "rejected":
    case "resolved":
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
  return roleCodes.indexOf("GRO" || "RO") > -1 ? true : false;
};

const displayStatus = (status = "", assignee) => {
  let statusObj = {};
  if (status.toLowerCase() == "rejected" || status.toLowerCase() == "resolved") {
    statusObj.status = `CS_COMMON_${status.toUpperCase()}_UCASE`;
  } else {
    statusObj.status = status;
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
      status: complaintDetail.rating ? displayStatus(`${complaintDetail.rating}/5`) : displayStatus(complaintDetail.actions[0].status),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).filter((imageSource) => isImage(imageSource)),
      complaintStatus: complaintDetail.actions[0].status && getTransformedStatus(complaintDetail.actions[0].status),
      address: complaintDetail.address ? complaintDetail.address : "Error fetching address",
    };
  });
  const closedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "CLOSED"), "date", "desc");

  return { userInfo, closedComplaints, role };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClosedComplaints);
