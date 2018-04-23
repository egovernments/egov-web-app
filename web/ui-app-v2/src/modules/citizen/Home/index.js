import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "modules/common/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Notifications from "./components/Notifications";
import { fetchComplaints } from "redux/complaints/actions";
import { mapCompIDToName } from "utils/commons";
import orderby from "lodash/orderBy";
import "./index.css";

class Home extends Component {
  componentDidMount = () => {
    const { fetchComplaints } = this.props;
    fetchComplaints([]);
  };

  render() {
    const { updates, history } = this.props;
    return (
      <Banner className="homepage-banner">
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <div className="row">
            <NewAndOldComplaints history={history} />
            <Notifications updates={updates} history={history} />
          </div>
        </div>
      </Banner>
    );
  }
}
const mapStateToProps = (state) => {
  const complaints = state.complaints || {};
  let updates = [];
  Object.keys(complaints.byId).forEach((complaintKey, index) => {
    let complaintObj = {};
    let complaintactions = complaints.byId[complaintKey].actions && complaints.byId[complaintKey].actions.filter((complaint) => complaint.status);
    complaintObj.status = complaints.byId[complaintKey].status;
    complaintObj.action = complaintactions && complaintactions[0].action;
    complaintObj.title = mapCompIDToName(complaints.categoriesById, complaints.byId[complaintKey].serviceCode);
    complaintObj.date = complaints.byId[complaintKey].auditDetails.createdTime;
    complaintObj.number = complaintKey;
    updates.push(complaintObj);
  });
  var closedComplaints = orderby(updates.filter((complaint) => complaint.status && complaint.status.toLowerCase() === "closed"), ["date"], ["desc"]);
  var nonClosedComplaints = orderby(
    updates.filter((complaint) => complaint.status && complaint.status.toLowerCase() != "closed"),
    ["date"],
    ["desc"]
  );
  return { updates: [...nonClosedComplaints, ...closedComplaints] };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
