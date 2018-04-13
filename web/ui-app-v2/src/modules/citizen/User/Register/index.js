import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterForm from "./components/RegisterForm";
import Banner from "modules/common/Banner";
import Screen from "modules/common/Screen";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/register").default;
  }

  componentDidMount = () => {
    this.props.initForm(this.formConfig);
  };

  navigateToLogin = () => {
    this.props.history.push("/citizen/user/login");
  };

  submitForm = (formKey) => {
    try {
      if (typeof androidAppProxy !== "undefined") {
        window.androidAppProxy.requestSMS();
      }
    } catch (error) {}

    this.props.submitForm(formKey);
  };

  render() {
    const { formConfig, submitForm, navigateToLogin } = this;
    const { form, loading, handleFieldChange } = this.props;
    const { name: formKey } = formConfig;

    return (
      <Screen loading={loading}>
        <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
          <RegisterForm form={form} formKey={formKey} onChange={handleFieldChange} submitForm={submitForm} navigateToLogin={navigateToLogin} />
        </Banner>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "register";
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  return { form, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
