import React, { Component } from "react";
import Screen from "../../common/Screen";
import HeaderCard from "../AssignComplaint/components/HeaderCard";
import ListCard from "../AssignComplaint/components/ListCard";
import Button from "../AssignComplaint/components/Button";
import Label from "utils/translationNode";
import { connect } from "react-redux";

class ReassignComplaint extends Component {
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
export default connect(mapStateToProps, null)(ReassignComplaint);
