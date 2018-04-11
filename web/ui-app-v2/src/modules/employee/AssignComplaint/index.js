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
    let { transformedComplaint } = this.props;
    return (
      <Screen>
        <HeaderCard complaint={transformedComplaint} />
        <ListCard />
        <Button label={<Label buttonLabel={true} label="ES_COMMON_ASSIGN" />} onClick={this.onAssignClick} />
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  let selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  const transformedComplaint = {
    header: selectedComplaint && selectedComplaint.serviceCode,
    address: selectedComplaint && selectedComplaint.address,
  };
  return { transformedComplaint };
};

export default connect(mapStateToProps, null)(AssignComplaint);
