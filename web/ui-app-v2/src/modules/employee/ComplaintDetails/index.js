import React, { Component } from "react";
import Details from "../../common/complaintDetails/components/Details";
import ComplaintTimeLine from "../../common/complaintDetails/components/ComplaintTimeLine";
import Comments from "../../common/complaintDetails/components/Comments";
import Actions from "../../common/complaintDetails/components/ActionButton";
import { Icon, MapLocation } from "components";
import Screen from "../../common/Screen";
import pinIcon from "assets/Location_pin.svg";
import { getDateFromEpoch, mapCompIDToName, isImage, fetchImages } from "utils/commons";
import { fetchComplaints } from "redux/complaints/actions";
import { setRoute } from "redux/app/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.css";

class ComplaintDetails extends Component {
  state = {
    openMap: false,
    status: {
      bgColor: "#f5a623",
      status: "Resolved",
    },
    details: {
      status: "Resolved",
      complaint: "Overflow of bins",
      applicationNo: "1234566",
      description: "Sterilization is scheduled in March. We are doing our best to resolve your issue at this time",
      images: [
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
      ],
      location: "Sector 32, 1 main, Amritsar",
    },
    role: "",
    hasComments: true,
  };

  componentDidMount() {
    let { fetchComplaints, match, fetchEmployees } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    let { details } = this.state;
    if (this.props.location && this.props.location.search.split("=")[1] === "rejected") {
      this.setState({
        status: {
          status: "Rejected",
          message: "JR.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Rejected",
        },
      });
    } else if (this.props.location && this.props.location.search.split("=")[1] == "filed") {
      this.setState({
        status: {
          status: "Submitted",
          message: "JR.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Submitted",
        },
      });
    } else if (this.props.location && this.props.location.search.split("=")[1] === "unassigned") {
      this.setState({
        status: {
          status: "Unassigned",
          message: "Jr.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Unassigned",
        },
        role: "AO",
        hasComments: false,
      });
    } else if (this.props.location && this.props.location.search.split("=")[1] === "unassigned&reassign") {
      this.setState({
        status: {
          status: "Reassign",
          message: "Jr.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Reassign",
        },
        role: "AO",
      });
    } else if (this.props.location && this.props.location.search.split("=")[1] === "assigned") {
      this.setState({
        status: {
          status: "Assign",
          message: "Jr.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Assign",
        },
        role: "AO",
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search === "?map") {
      console.log("hit");
      this.setState({ openMap: true });
    } else {
      this.setState({ openMap: false });
    }
  }

  redirectToMap = (isOpen, location) => {
    this.setState({
      location: location,
    });
    var pathName = this.props.history.location.pathname;
    if (isOpen === true) this.props.history.push(pathName + "?map");
    else if (isOpen === false) this.props.history.goBack();
  };

  btnOneOnClick = (complaintNo, label) => {
    //Action for first button
    let { setRoute } = this.props;
    switch (label) {
      case "ES_REJECT_BUTTON":
        setRoute(`/employee/reject-complaint/${complaintNo}`);
        break;
      case "ES_REQUEST_REQUEST_RE_ASSIGN":
        setRoute(`/employee/request-reassign/${complaintNo}`);
        break;
    }
  };
  btnTwoOnClick = (complaintNo, label) => {
    //Action for second button
    let { setRoute } = this.props;
    switch (label) {
      case "ES_COMMON_ASSIGN":
        setRoute(`/employee/assign-complaint/${complaintNo}`);
        break;
      case "ES_COMMON_REASSIGN":
        setRoute(`/employee/reassign-complaint/${complaintNo}`);
        break;
      case "ES_RESOLVE_MARK_RESOLVED":
        setRoute(`/employee/complaint-resolved/${complaintNo}`);
        break;
    }
  };

  render() {
    let { status, details, comments, hasComments, location, openMap } = this.state;
    let { complaint, timeLine } = this.props.transformedComplaint;
    let { role, serviceRequestId, history } = this.props;
    let btnOneLabel = "";
    let btnTwoLabel = "";
    let action;
    if (complaint) {
      if (role === "ao") {
        if (complaint.complaintStatus.toLowerCase() === "unassigned") {
          btnOneLabel = "ES_REJECT_BUTTON";
          btnTwoLabel = "ES_COMMON_ASSIGN";
        } else if (complaint.complaintStatus.toLowerCase() === "reassign") {
          btnOneLabel = "ES_REJECT_BUTTON";
          btnTwoLabel = "ES_COMMON_REASSIGN";
        }
      } else if (role === "employee") {
        if (complaint.complaintStatus.toLowerCase() === "assigned") {
          btnOneLabel = "ES_REQUEST_REQUEST_RE_ASSIGN";
          btnTwoLabel = "ES_RESOLVE_MARK_RESOLVED";
        }
      }
    }
    if (timeLine && timeLine[0]) {
      action = timeLine[0].action;
    }
    return (
      <div>
        <Screen>
          {complaint &&
            !openMap && (
              <div>
                <Details {...complaint} role={role} history={history} mapAction={true} redirectToMap={this.redirectToMap} action={action} />
                <ComplaintTimeLine
                  status={complaint.status}
                  timeLine={timeLine}
                  handleFeedbackOpen={this.handleFeedbackOpen}
                  role={role}
                  feedback={complaint ? complaint.feedback : ""}
                  rating={complaint ? complaint.rating : ""}
                />
                {complaint.complaintStatus.toLowerCase() !== "closed" && <Comments comments={comments} hasComments={true} />}
                <div>
                  {(role === "ao" &&
                    complaint.complaintStatus.toLowerCase() !== "assigned" &&
                    complaint.complaintStatus.toLowerCase() !== "closed") ||
                  (role === "employee" &&
                    complaint.complaintStatus.toLowerCase() === "assigned" &&
                    complaint.complaintStatus.toLowerCase() !== "closed") ? (
                    <Actions
                      btnOneLabel={btnOneLabel}
                      btnOneOnClick={() => this.btnOneOnClick(serviceRequestId, btnOneLabel)}
                      btnTwoLabel={btnTwoLabel}
                      btnTwoOnClick={() => this.btnTwoOnClick(serviceRequestId, btnTwoLabel)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
        </Screen>
        {openMap && (
          <div>
            <div className="back-btn" style={{ top: 32 }}>
              <Icon
                className="mapBackBtn"
                onClick={() => {
                  this.redirectToMap(false);
                }}
                style={{
                  height: 24,
                  width: 24,
                  color: "#484848",
                }}
                action="navigation"
                name={"arrow-back"}
              />
            </div>
            <MapLocation currLoc={location} icon={pinIcon} hideTerrainBtn={true} viewLocation={true} />
          </div>
        )}
      </div>
    );
  }
}

const isAssigningOfficer = (roles) => {
  const roleCodes = roles.map((role, index) => {
    return role.code;
  });
  return roleCodes.indexOf("GRO" || "RO") > -1 ? true : false;
};

//Don't Delete this
const getLatestStatus = (status) => {
  let transformedStatus = "";
  switch (status.toLowerCase()) {
    case "open":
      transformedStatus = "UNASSIGNED";
      break;
    case "new":
      transformedStatus = "UNASSIGNED";
      break;
    case "closed":
      transformedStatus = "CLOSED";
      break;
    case "assigned":
      transformedStatus = "ASSIGNED";
      break;
    case "reassignrequested":
      transformedStatus = "REASSIGN";
      break;
    default:
      transformedStatus = "CLOSED";
      break;
  }
  return transformedStatus;
};

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  const { userInfo } = state.auth;
  const serviceRequestId = ownProps.match.params.serviceRequestId;
  let selectedComplaint = complaints["byId"][decodeURIComponent(ownProps.match.params.serviceRequestId)];
  const role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  if (selectedComplaint) {
    let details = {
      status: selectedComplaint.status,
      complaint: mapCompIDToName(complaints.categoriesById, selectedComplaint.serviceCode),
      applicationNo: selectedComplaint.serviceRequestId,
      description: selectedComplaint.description,
      submittedDate: getDateFromEpoch(selectedComplaint.auditDetails.createdTime),
      address: selectedComplaint.address,
      latitude: selectedComplaint.lat,
      longitude: selectedComplaint.long,
      images: fetchImages(selectedComplaint.actions).filter((imageSource) => isImage(imageSource)),
      complaintStatus: selectedComplaint.status && getLatestStatus(selectedComplaint.status),
      feedback: selectedComplaint.feedback,
      rating: selectedComplaint.rating,
    };
    let timeLine = [];
    timeLine = selectedComplaint.actions.filter((action) => action.status && action.status);
    let transformedComplaint = {
      complaint: details,
      timeLine,
    };
    return { transformedComplaint, role, serviceRequestId };
  } else {
    return { transformedComplaint: {}, role, serviceRequestId };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetails);
