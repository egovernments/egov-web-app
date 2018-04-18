import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "modules/common/Banner";
import OTPForm from "./components/OTPForm";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";
import { toggleSnackbarAndSetText } from "redux/app/actions";
import { setRoute } from "redux/app/actions";
import { sendOTP } from "redux/auth/actions";
import Screen from "modules/common/Screen";

class OTP extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/employeeOTP").default;
  }

  componentDidMount() {
    const { initForm } = this.props;
    initForm(this.formConfig);
  }

  resendOTP = () => {
    const { sendOTP, forgotPasswdFormKey } = this.props;
    sendOTP(forgotPasswdFormKey);
  };

  submitOTPForm = (formKey) => {
    const { form, submitForm, toggleSnackbarAndSetText } = this.props;
    const { newPassword, confirmnewpassword } = form && form.fields;
    if (newPassword.value === confirmnewpassword.value) {
      submitForm(formKey);
    } else {
      toggleSnackbarAndSetText(true, "Password do not match", true);
    }
  };

  render() {
    const { form, handleFieldChange, submitForm, phoneNumber, loading, history } = this.props;
    const { resendOTP, submitOTPForm } = this;
    const { name: formKey } = this.formConfig;

    return (
      <Screen loading={loading}>
        <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
          <OTPForm
            submitForm={submitForm}
            resendOTP={resendOTP}
            form={form}
            formKey={formKey}
            phoneNumber={phoneNumber}
            onChange={handleFieldChange}
            history={history}
            submitOTPForm={submitOTPForm}
          />
        </Banner>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "employeeOTP";
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  const { authenticating } = state.auth;
  const { previousRoute } = state.app;
  let phoneNumber = null;
  const forgotPasswdFormKey = "employeeForgotPasswd";
  const forgotPasswdform = state.form[forgotPasswdFormKey] || {};
  if (forgotPasswdform.fields && forgotPasswdform.fields.username) {
    phoneNumber = forgotPasswdform.fields.username.value;
  }
  return { form, previousRoute, phoneNumber, loading: loading || authenticating, forgotPasswdFormKey };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    setRoute: (route) => dispatch(setRoute(route)),
    sendOTP: (otp) => dispatch(sendOTP(otp)),
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
