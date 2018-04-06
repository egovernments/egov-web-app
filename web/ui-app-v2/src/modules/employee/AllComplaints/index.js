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
import { transformById, getDateFromEpoch, mapCompIDToName } from "utils/commons";
import { connect } from "react-redux";
import "./index.css";

class AllComplaints extends Component {
  constructor(props) {
    super(props);
    this.allComplaints = [
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "UNASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        reassign: true,
        header: "Garbage",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "Overdue by 1 day",
        complaintStatus: "UNASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Garbage_1,
          },
          {
            source: Garbage_2,
          },
          {
            source: Garbage_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "UNASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Garbage",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "Overdue by 1 day",
        complaintStatus: "ASSIGNED",
        assignedTo: "Jasbir Singh",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Garbage_1,
          },
          {
            source: Garbage_2,
          },
          {
            source: Garbage_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "ASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
    ];

    this.employeeComplaints = [
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "ASSIGNED",
        assignee: "Dharmendra Pal",
        submittedBy: "Shivani",
        escalatedTo: "Dept 1 Head",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        reassign: true,
        header: "Garbage",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "Overdue by 1 day",
        complaintStatus: "ASSIGNED",
        submittedBy: "Shrinivas",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Garbage_1,
          },
          {
            source: Garbage_2,
          },
          {
            source: Garbage_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "ASSIGNED",
        submittedBy: "Rajeev",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
    ];
  }

  componentDidMount() {
    let { fetchComplaints } = this.props;
    fetchComplaints([]);
  }

  //Don't Delete
  handleTabChange = (label) => {
    console.log(label);
  };

  onComplaintClick = (complaintNo) => {
    let { setRoute } = this.props;
    setRoute(`/employee/complaint-details/${complaintNo}`);
  };

  render() {
    const tabStyle = {
      letterSpacing: "0.6px",
    };
    const { onComplaintClick } = this;
    const { assignedComplaints, unassignedComplaints, userInfo, employeeComplaints, role } = this.props;
    return role === "ao" ? (
      <Tabs
        className="employee-complaints-tab"
        onActive={this.handleTabChange}
        tabs={[
          {
            label: <Label color={"#ffffff"} bold={true} label={`UNASSIGNED (${unassignedComplaints.length})`} labelStyle={tabStyle} />,
            children: (
              <Screen>
                <div className="tab1-content">
                  <Complaints onComplaintClick={onComplaintClick} complaints={unassignedComplaints} complaintLocation={true} role={role} />
                </div>
              </Screen>
            ),
          },
          {
            label: <Label color={"#ffffff"} bold={true} label={`ASSIGNED (${assignedComplaints.length})`} labelStyle={tabStyle} />,
            children: (
              <Screen>
                <div className="tab2-content">
                  <Complaints onComplaintClick={onComplaintClick} complaints={assignedComplaints} complaintLocation={true} role={role} />
                </div>
              </Screen>
            ),
          },
        ]}
      />
    ) : (
      <Screen>
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
    default:
      transformedStatus = "CLOSED";
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
  const assignedComplaints = transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED");
  const unassignedComplaints = transformedComplaints.filter((complaint) => complaint.complaintStatus === "UNASSIGNED");
  const employeeComplaints = transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED");
  return { userInfo, assignedComplaints, unassignedComplaints, employeeComplaints, role };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllComplaints);
