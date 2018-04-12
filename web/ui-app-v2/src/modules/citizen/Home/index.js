import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "modules/common/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Notifications from "./components/Notifications";
import { fetchComplaints } from "redux/complaints/actions";
import { mapCompIDToName, displayStatus } from "utils/commons";
import orderby from "lodash/orderBy";
import "./index.css";

class Home extends Component {
  componentDidMount = () => {
    let { fetchComplaints } = this.props;
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

// const displayDate = (rawData) => {
//   let split = rawData.split("/");
//   split.splice(split.length - 1, 1);
//   return split.join("-");
// };

const mapStateToProps = (state) => {
  const complaints = state.complaints || {};
  let updates = [];
  Object.keys(complaints.byId).forEach((complaintKey, index) => {
    let complaintObj = {};
    complaintObj.status = displayStatus(complaints.byId[complaintKey].status);
    complaintObj.action =
      complaints.byId[complaintKey].actions && complaints.byId[complaintKey].actions[0] && complaints.byId[complaintKey].actions[0].action;
    complaintObj.title = mapCompIDToName(complaints.categoriesById, complaints.byId[complaintKey].serviceCode);
    complaintObj.date = complaints.byId[complaintKey].auditDetails.createdTime;
    complaintObj.number = complaintKey;
    updates.push(complaintObj);
  });
  // debugger;
  var closedComplaints = orderby(updates.filter((complaint) => complaint.status === "Closed"), ["date"], ["desc"]);
  var nonClosedComplaints = orderby(updates.filter((complaint) => complaint.status != "Closed"), ["date"], ["desc"]);
  return { updates: [...nonClosedComplaints, ...closedComplaints] };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
