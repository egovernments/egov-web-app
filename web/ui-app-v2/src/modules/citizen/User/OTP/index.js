import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import OTPForm from "./components/OTPForm";
import { handleFieldChange, initForm, submitForm } from "../../../../redux/form/actions";

class OTP extends Component {
  formConfig = {
    name: "otp",
    fields: {
      otp: {
        id: "otp",
        required: true,
        floatingLabelText: "OTP",
        hintText: "Enter OTP",
        pattern: "^([0-9]){6}$",
        errorMessage: "Please enter a valid OTP",
      },
    },
    saveUrl: "/user/validateOTP",
  };

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
    const { form, handleFieldChange, submitForm } = this.props;
    const { name: formKey } = this.formConfig;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <OTPForm submitForm={submitForm} form={form} formKey={formKey} onChange={handleFieldChange} />
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "otp";
  const form = state.form[formKey] || {};
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
