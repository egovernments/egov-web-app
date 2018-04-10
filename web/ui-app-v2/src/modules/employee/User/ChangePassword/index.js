import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import PasswordForm from "./components/PasswordForm";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/employeeChangePassword").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  render() {
    const { form, handleFieldChange, submitForm } = this.props;
    const { name: formKey } = this.formConfig;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <PasswordForm form={form} submitForm={submitForm} formKey={formKey} onChange={handleFieldChange} />
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "employeeChangePassword";
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
