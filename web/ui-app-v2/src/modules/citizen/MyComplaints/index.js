import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "components";
import Complaints from "modules/common/Complaints";
import Screen from "modules/common/Screen";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Label from "utils/translationNode";
import { fetchComplaints } from "redux/complaints/actions";
import { setRoute } from "redux/app/actions";
import { mapCompIDToName, isImage,fetchImages } from "utils/commons";
import orderby from "lodash/orderBy";
import "./index.css";

class MyComplaints extends Component {
  componentDidMount = () => {
    let { fetchComplaints } = this.props;
    fetchComplaints([]);
  };

  onComplaintClick = (complaintNo) => {
    let { setRoute } = this.props;
    setRoute(`/citizen/complaint-details/${complaintNo}`);
  };

  render() {
    let { setRoute, transformedComplaints, history } = this.props;
    let { onComplaintClick } = this;
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
            <Complaints
              onComplaintClick={onComplaintClick}
              setRoute={setRoute}
              complaints={transformedComplaints}
              onClick={this.imageOnClick}
              track={true}
              role={"citizen"}
            />
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

const displayStatus = (status = "", assignee) => {
  let statusObj = {};
  if (status.toLowerCase() == "closed" || status.toLowerCase() == "rejected" || status.toLowerCase() == "resolved") {
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
  const complaints = state.complaints || {};
  let transformedComplaints = [];
  Object.keys(complaints.byId).forEach((complaint, index) => {
    let complaintObj = {};
    complaintObj.header = mapCompIDToName(complaints.categoriesById, complaints.byId[complaint].serviceCode);
    complaintObj.date = complaints.byId[complaint].auditDetails.createdTime;
    complaintObj.status = displayStatus(complaints.byId[complaint].status, complaints.byId[complaint].assignee);
    complaintObj.complaintNo = complaints.byId[complaint].serviceRequestId;
    complaintObj.images = fetchImages(complaints.byId[complaint].actions).filter((imageSource) => isImage(imageSource));

    transformedComplaints.push(complaintObj);
  });
  var closedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.status === "Closed"), ["date"], ["desc"]);
  var nonClosedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.status != "Closed"), ["date"], ["desc"]);
  return { complaints, transformedComplaints: [...nonClosedComplaints, ...closedComplaints] };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComplaints);
