import React, { Component } from "react";
import { connect } from "react-redux";
import Details from "modules/common/complaintDetails/components/Details";
import ComplaintTimeLine from "modules/common/complaintDetails/components/ComplaintTimeLine";
import Comments from "modules/common/complaintDetails/components/Comments";
import Screen from "modules/common/Screen";
import { fetchComplaints } from "redux/complaints/actions";
import { getDateFromEpoch, mapCompIDToName, isImage } from "utils/commons";
import "./index.css";

class ComplaintDetails extends Component {
  state = {
    status: {
      bgColor: "#f5a623",
      status: "Resolved",
    },
    details: {
      status: "Resolved",
      complaint: "Overflow of bins",
      applicationNo: "1234566",
      description: "Sterilization is scheduled in March. We are doing our best to resolve your issue at this time",
      location: "Sector 32, 1 main, Amritsar",
    },
    source: "",
    hideImageModal: true,
  };

  componentDidMount() {
    let { fetchComplaints, match } = this.props;
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
    }
  }

  render() {
    let { complaint, timeLine } = this.props.transformedComplaint;
    let { details, comments } = this.state;
    return (
      <Screen>
        {complaint && (
          <div>
            <Details {...complaint} />
            <ComplaintTimeLine
              status={complaint.status}
              timeLine={timeLine}
              feedback={complaint ? complaint.feedback : ""}
              rating={complaint ? complaint.rating : ""}
            />
            <Comments comments={comments} hasComments={true} />
          </div>
        )}
      </Screen>
    );
  }
}

const fetchImages = (actionArray) => {
  let imageArray = [];
  actionArray.forEach((action, index) => {
    action.media && imageArray.push(action.media);
  });
  return imageArray[0] ? imageArray[0] : [];
};

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  let selectedComplaint = complaints["byId"][decodeURIComponent(ownProps.match.params.serviceRequestId)];
  if (selectedComplaint) {
    let details = {
      status: selectedComplaint.status,
      complaint: mapCompIDToName(complaints.categoriesById, selectedComplaint.serviceCode),
      applicationNo: selectedComplaint.serviceRequestId,
      description: selectedComplaint.description,
      submittedDate: getDateFromEpoch(selectedComplaint.auditDetails.createdTime),
      address: selectedComplaint.address,
      images: fetchImages(selectedComplaint.actions).filter((imageSource) => isImage(imageSource)),
      feedback: selectedComplaint.feedback,
      rating: selectedComplaint.rating,
    };
    let timeLine = [];
    timeLine = selectedComplaint.actions.filter((action) => action.status && action.status!="reassignrequested" && action.status);
    let transformedComplaint = {
      complaint: details,
      timeLine,
    };
    return { transformedComplaint };
  } else {
    return { transformedComplaint: {} };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetails);
