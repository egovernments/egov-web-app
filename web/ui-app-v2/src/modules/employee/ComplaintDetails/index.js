import React, { Component } from "react";
import Details from "../../common/complaintDetails/components/Details";
import ComplaintTimeLine from "../../common/complaintDetails/components/ComplaintTimeLine";
import Comments from "../../common/complaintDetails/components/Comments";
import Actions from "../../common/complaintDetails/components/ActionButton";
import { Icon, MapLocation } from "components";
import Screen from "../../common/Screen";
import pinIcon from "assets/Location_pin.svg";
import { getDateFromEpoch, mapCompIDToName, isImage } from "utils/commons";
import { fetchComplaints } from "redux/complaints/actions";
import { setRoute } from "redux/app/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.css";

class ComplaintDetails extends Component {
  state={
    isOpen:false,
    location:""
  }
  componentDidMount() {
    let { fetchComplaints, match} = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
  }

  redirectToMap = (isOpen, location) => {
    //Redirect to Map
    this.setState({
      openMap: isOpen,
      location: location,
    });
    var element = document.getElementsByClassName("header-with-drawer")[0];
    isOpen ? element.classList.toggle("hide") : element.classList.remove("hide");
  };

  btnOneOnClick = (complaintNo, label) => {
    //Action for first button
    let { setRoute } = this.props;
    switch (label) {
      case "REJECT":
        setRoute(`/employee/reject-complaint/${complaintNo}`);
        break;
      case "REQUEST RE-ASSIGN":
        setRoute(`/employee/request-reassign/${complaintNo}`);
        break;
    }
  };
  btnTwoOnClick = (complaintNo, label) => {
    //Action for second button
    let { setRoute } = this.props;
    switch (label) {
      case "ASSIGN":
        setRoute(`/employee/assign-complaint/${complaintNo}`);
        break;
      case "RE-ASSIGN":
        setRoute(`/employee/assign-complaint/${complaintNo}`);
        break;
      case "MARK RESOLVED":
        setRoute(`/employee/complaint-resolved/${complaintNo}`);
        break;
    }
  };

  render() {
    let {openMap,location} =this.state;
    let { complaint, timeLine } = this.props.transformedComplaint;
    let { role, serviceRequestId } = this.props;
    const {redirectToMap} =this;
    let btnOneLabel = "";
    let btnTwoLabel = "";
    if (complaint) {
      if (role === "ao") {
        if (complaint.status.toLowerCase() === "open") {
          btnOneLabel = "REJECT";
          btnTwoLabel = "ASSIGN";
        } else if (complaint.status.toLowerCase() === "reassignrequested") {
          btnOneLabel = "REJECT";
          btnTwoLabel = "RE-ASSIGN";
        }
      } else if (role === "employee") {
        if (complaint.status.toLowerCase() === "assigned") {
          btnOneLabel = "REQUEST RE-ASSIGN";
          btnTwoLabel = "MARK RESOLVED";
        }
      }
    }
    debugger;
    return (
      <div>
      <Screen>
        {complaint && !openMap && (
          <div>
            <Details {...complaint} role={role} mapAction={true} redirectToMap={redirectToMap}/>
            <ComplaintTimeLine
              status={complaint.status}
              timeLine={timeLine}
              handleFeedbackOpen={this.handleFeedbackOpen}
              role={role}
              feedback={complaint ? complaint.feedback : ""}
              rating={complaint ? complaint.rating : ""}
            />
            <Comments hasComments={true} />


              {
                (role === "ao" && complaint.status.toLowerCase() !== "assigned" && complaint.status.toLowerCase() !== "closed") ||
                  (role === "employee" &&
                    complaint.status.toLowerCase() === "assigned" &&
                    complaint.status.toLowerCase() !== "closed") ?(
                <Actions
                  btnOneLabel={btnOneLabel}
                  btnOneOnClick={() => this.btnOneOnClick(serviceRequestId, btnOneLabel)}
                  btnTwoLabel={btnTwoLabel}
                  btnTwoOnClick={() => this.btnTwoOnClick(serviceRequestId, btnTwoLabel)}

                />):""
              }


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

const fetchImages = (actionArray) => {
  let imageArray = [];
  actionArray.forEach((action, index) => {
    action.media && imageArray.push(action.media);
  });
  return imageArray[0] ? imageArray[0] : null;
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
      feedback: selectedComplaint.feedback,
      rating: selectedComplaint.rating,
    };
    let timeLine = [];
    timeLine = selectedComplaint.actions.filter((action) => action.status && action.status != "reassignrequested" && action.status);
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
