import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "components";
import Complaints from "modules/common/Complaints";
import Screen from "modules/common/Screen";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Label from "utils/translationNode";
import { fetchComplaints } from "redux/complaints/actions";
import { setRoute } from "redux/app/actions";
import { mapCompIDToName, isImage, fetchImages, displayLocalizedStatusMessage } from "utils/commons";
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
    let { setRoute, transformedComplaints, history, loading } = this.props;
    let { onComplaintClick } = this;
    return (
      <Screen loading={loading}>
        <div className="complaints-main-container clearfix">
          {transformedComplaints.length === 0 ? (
            <div className="no-complaints-message-cont">
              <Label label={"CS_MYCOMPLAINTS_NO_COMPLAINTS"} dark={true} fontSize={"16px"} labelStyle={{ letterSpacing: "0.7px" }} />
            </div>
          ) : (
            <Complaints
              onComplaintClick={onComplaintClick}
              setRoute={setRoute}
              complaints={transformedComplaints}
              onClick={this.imageOnClick}
              track={true}
              role={"citizen"}
            />
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
      </Screen>
    );
  }
}

const displayStatus = (status = "", assignee, action) => {
  let statusObj = {};
  if (status.toLowerCase() == "closed" || status.toLowerCase() == "rejected" || status.toLowerCase() == "resolved") {
    statusObj.status = "CS_COMMON_CLOSED_UCASE";
  } else {
    statusObj.status = "CS_COMMON_OPEN_UCASE";
  }

  if (status) {
    if (status === "open" && action && action === "reopen") {
      statusObj.statusMessage = displayLocalizedStatusMessage("reopened");
    } else if (status === "assigned" && action && action === "reassign") {
      statusObj.statusMessage = displayLocalizedStatusMessage("reassigned");
    } else {
      statusObj.statusMessage = displayLocalizedStatusMessage(status);
    }
  }

  return statusObj;
};

const mapStateToProps = (state) => {
  const complaints = state.complaints || {};
  const { loading } = complaints || false;
  const transformedComplaints = Object.keys(complaints.byId).map((complaint, index) => {
    let complaintactions = complaints.byId[complaint].actions && complaints.byId[complaint].actions.filter((complaint) => complaint.status);
    return {
      header: mapCompIDToName(complaints.categoriesById, complaints.byId[complaint].serviceCode),
      date: complaints.byId[complaint].auditDetails.createdTime,
      status: displayStatus(complaints.byId[complaint].status, complaints.byId[complaint].assignee, complaintactions[0].action),
      complaintNo: complaints.byId[complaint].serviceRequestId,
      images: fetchImages(complaints.byId[complaint].actions).filter((imageSource) => isImage(imageSource)),
    };
  });
  var closedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.status === "Closed"), ["date"], ["desc"]);
  var nonClosedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.status != "Closed"), ["date"], ["desc"]);
  return { complaints, transformedComplaints: [...nonClosedComplaints, ...closedComplaints], loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComplaints);
