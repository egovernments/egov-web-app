import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import OTPForm from "./components/OTPForm";
import { handleFieldChange, initForm, submitForm } from "../../../../redux/form/actions";
import { setRoute } from "../../../../redux/app/actions";
import isEmpty from "lodash/isEmpty";

class OTP extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/otp").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
    const otpElement = document.getElementById("otp");
    otpElement.addEventListener("smsReceived", (e) => {
      const { otp } = e.detail;
      this.props.handleFieldChange("otp", "otp", otp);
    });
  }

  componentWillUnmount() {
    const otpElement = document.getElementById("otp");
    otpElement.removeEventListener("smsReceived", null);
  }

  render() {
    const { form, handleFieldChange, submitForm, phoneNumber } = this.props;
    const { name: formKey } = this.formConfig;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <OTPForm submitForm={submitForm} form={form} formKey={formKey} phoneNumber={phoneNumber} onChange={handleFieldChange} />
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "otp";
  const form = state.form[formKey] || {};
  const { previousRoute } = state.app;
  const previousForm = previousRoute.endsWith("register") ? "register" : previousRoute.endsWith("login") ? "login" : null;
  let phoneNumber = null;
  if (previousForm) {
    phoneNumber = state.form[previousForm].fields.phone.value;
  }
  // const state[]
  return { form, phoneNumber };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
