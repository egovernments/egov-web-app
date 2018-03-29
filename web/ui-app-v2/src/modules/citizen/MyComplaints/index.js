import React, { Component } from "react";
import Complaints from "../../common/Complaints";
import Screen from "../../common/Screen";
import { Icon, ImageModal } from "../../../components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchComplaints } from "../../../redux/complaints/actions";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Garbage_1 from "../../../assets/images/Garbage_1.jpg";
import Garbage_2 from "../../../assets/images/Garbage_2.jpg";
import Garbage_3 from "../../../assets/images/Garbage_3.jpg";
import Potholes_1 from "../../../assets/images/Potholes_1.png";
import Potholes_2 from "../../../assets/images/Potholes_2.jpg";
import Potholes_3 from "../../../assets/images/Potholes_3.jpg";
import Label from "utils/translationNode";
import "./index.css";
import { transformById } from "../../../utils/commons";
import { getDateFromEpoch, mapCompIDToName } from "../../../utils/commons";

class MyComplaints extends Component {
  componentDidMount = () => {
    let { fetchComplaints } = this.props;
    fetchComplaints([]);
  };

  render() {
    let { history, transformedComplaints, complaints } = this.props;
    return (
      <div className="complaints-main-container clearfix">
        {this.props.complaints.loading ? (
          <div className="loading-container">
            <Label
              label="Loading"
              fontSize={16}
              containerStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              labelStyle={{ letterSpacing: 0.7, zIndex: 2000, color: "#ffffff" }}
            />
          </div>
        ) : transformedComplaints.length === 0 ? (
          <div className="no-complaints-message-cont">
            <Label label={"CS_MYCOMPLAINTS_NO_COMPLAINTS"} dark={true} fontSize={"16px"} labelStyle={{ letterSpacing: "0.7px" }} />
          </div>
        ) : (
          <Screen>
            <Complaints complaints={transformedComplaints} onClick={this.imageOnClick} track={true} role={"citizen"} />
          </Screen>
        )}
        <div className="floating-button-cont">
          <FloatingActionButton
            id="mycomplaints-add"
            onClick={(e) => {
              history.push("/citizen/add-complaint");
            }}
            className="floating-button"
          >
            <Icon action="content" name="add" />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

const displayDate = (rawData) => {
  let split = rawData.split("/");
  split.splice(split.length - 1, 1);
  return split.join("-");
};

const displayStatus = (status="", assignee) => {
  let statusObj = {};
  switch (status.toLowerCase()) {
    case "new":
      statusObj.status = "OPEN";
      statusObj.statusMessage = `Your complaint has been opened`;
      break;
    case "rejected":
      statusObj.status = "REJECTED";
      statusObj.statusMessage = `Your complaint has been rejected`;
      break;
    case "closed":
      statusObj.status = "OPEN";
      statusObj.statusMessage = `Complaint Resolved. Please Rate`;
      break;
    case "open":
      statusObj.status = "OPEN";
      statusObj.statusMessage = `Your complaint has been re-assigned to ${assignee}`;
      break;
    default:
      statusObj.status = "OPEN";
      statusObj.statusMessage = `Your complaint has been opened`;
      break;
  }
  return statusObj;
};

const mapStateToProps = (state) => {
  const complaints = state.complaints || {};
  let transformedComplaints = [];
  Object.keys(complaints.byId).forEach((complaint, index) => {
    let complaintObj = {};
    complaintObj.header = mapCompIDToName(complaints.categoriesById, complaints.byId[complaint].serviceCode);
    complaintObj.date = getDateFromEpoch(complaints.byId[complaint].auditDetails.createdTime);
    complaintObj.status = displayStatus(complaints.byId[complaint].status, complaints.byId[complaint].assignee);
    complaintObj.complaintNo = complaints.byId[complaint].serviceRequestId;
    complaintObj.images = [
      {
        source: Potholes_1,
      },
      {
        source: Potholes_2,
      },
      {
        source: Potholes_3,
      },
    ];
    transformedComplaints.push(complaintObj);
  });
  return { complaints, transformedComplaints };
};

const mapDispatchToProps = {
  fetchComplaints,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyComplaints));
