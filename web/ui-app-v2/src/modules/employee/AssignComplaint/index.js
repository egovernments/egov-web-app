import React, { Component } from "react";
import { connect } from "react-redux";
import Screen from "modules/common/Screen";
import HeaderCard from "./components/HeaderCard";
import ListCard from "./components/ListCard";
import faceOne from "assets/images/faceOne.jpg";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";

class AssignComplaint extends Component {
  render() {
    const { transformedComplaint, loading, ...rest } = this.props;
    return (
      <Screen loading={loading}>
        <HeaderCard complaint={transformedComplaint} />
        <ListCard {...rest} />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  const { history } = ownProps;
  const { loading } = state.form || false;
  const serviceRequestId = ownProps.match.params.serviceRequestId;
  const { departmentById, designationsById, employeeById } = state.common;
  const APIData = Object.keys(employeeById).map((item, index) => {
    return employeeById[item];
  });
  let selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  const transformedComplaint = {
    header: selectedComplaint && selectedComplaint.serviceCode,
    address: selectedComplaint && selectedComplaint.address,
  };
  return { designationsById, departmentById, APIData, transformedComplaint, loading, history, serviceRequestId };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignComplaint);
