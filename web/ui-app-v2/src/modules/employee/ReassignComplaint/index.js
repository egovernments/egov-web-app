import React, { Component } from "react";
import Screen from "../../common/Screen";
import HeaderCard from "../AssignComplaint/components/HeaderCard";
import ListCard from "../AssignComplaint/components/ListCard";
import Button from "../AssignComplaint/components/Button";
import Label from "utils/translationNode";
import { connect } from "react-redux";

class ReassignComplaint extends Component {
  onReassignClick = () => {
    let { history } = this.props;
    history.push("/employee/complaint-reassigned");
  };
  render() {
    const { loading } = this.props;
    return (
      <Screen loading={loading}>
        <HeaderCard />
        <ListCard />
        <Button label={<Label buttonLabel={true} label="ES_COMMON_REASSIGN" />} onClick={this.onReassignClick} />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading } = state.form || false;
  return { loading };
};

export default connect(mapStateToProps, null)(ReassignComplaint);
