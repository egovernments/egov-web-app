import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import Screen from "modules/common/Screen";
import ForgotPasswd from "./components/ForgotPasswd";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
    };
    this.formConfig = require("config/forms/employeeForgotPasswd").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  onContinueClick = () => {
    const { submitForm, formKey, history } = this.props;
    submitForm(formKey);
  };

  onPhoneNumberChanged = (e, value) => {
    const { handleFieldChange, formKey } = this.props;
    handleFieldChange(formKey, "username", value);
  };

  render() {
    const { onPhoneNumberChanged, onContinueClick } = this;
    const { phoneNumber } = this.state;
    const { loading, form } = this.props;
    const fields = form.fields || {};

    return (
      <Screen loading={loading}>
        <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
          <ForgotPasswd
            isEmployee={true}
            phoneNumber={fields.username}
            onPhoneNumberChanged={onPhoneNumberChanged}
            onContinueClick={onContinueClick}
            fields={fields}
          />
        </Banner>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "employeeForgotPasswd";
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  return { form, loading, formKey };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
