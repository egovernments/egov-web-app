import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import RegisterForm from "./components/RegisterForm";
import { handleFieldChange, submitForm, initForm } from "../../../../redux/form/actions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("../../../../config/forms/register").default;
  }

 componentDidMount=async ()=> {
    this.props.initForm(this.formConfig);
  }

  navigateToLogin = () => {
    this.props.history.push("/citizen/user/login");
  };

  render() {
    const { formConfig, navigateToLogin } = this;
    const { form, handleFieldChange, submitForm } = this.props;
    const { name: formKey } = formConfig;
    const { submitting } = form;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        {submitting ? (
          <div>Loading...</div>
        ) : (
          <RegisterForm form={form} formKey={formKey} onChange={handleFieldChange} submitForm={submitForm} navigateToLogin={navigateToLogin} />
        )}
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "register";
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
