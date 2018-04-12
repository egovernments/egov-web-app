import React, { Component } from "react";
import Screen from "../../common/Screen";
import HeaderCard from "./components/HeaderCard";
import ListCard from "./components/ListCard";
import Button from "./components/Button";
import Label from "utils/translationNode";
import { connect } from "react-redux";

class AssignComplaint extends Component {
  // onAssignClick = () => {
  //   let { history } = this.props;
  //   history.push("/employee/complaint-assigned");
  // };

  render() {
    let { transformedComplaint, loading } = this.props;
    return (
      <Screen loading={loading}>
        <HeaderCard complaint={transformedComplaint} />
        <ListCard />
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  const { loading } = state.form || false;
  let selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  const transformedComplaint = {
    header: selectedComplaint && selectedComplaint.serviceCode,
    address: selectedComplaint && selectedComplaint.address,
  };
  return { transformedComplaint, loading };
};

export default connect(mapStateToProps, null)(AssignComplaint);
