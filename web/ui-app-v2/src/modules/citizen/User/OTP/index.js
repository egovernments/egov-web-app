import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import OTPForm from "./components/OTPForm";
import { handleFieldChange, initForm, submitForm } from "../../../../redux/form/actions";
import { setRoute } from "../../../../redux/app/actions";
import isEmpty from "lodash/isEmpty";

class OTP extends Component {
  formConfig = {
    name: "otp",
    fields: {
      otp: {
        id: "otp",
        required: true,
        jsonPath: "User.otpReference",
        floatingLabelText: "OTP",
        hintText: "Enter OTP",
        pattern: "^([0-9]){5}$",
        errorMessage: "Please enter a valid OTP",
      },
    },
    action: "_create",
    saveUrl: "/user/citizen/_create",
    navigation: "/citizen",
  };
  constructor(props) {
    super(props);
    this.formConfig = require("../../../../config/forms/otp").default;
  }

  componentDidMount() {
    let { setRoute } = this.props;
    // if (localStorage.previousPath) {
    // if (localStorage.previousPath == "/citizen/user/register") {
    let { fields } = this.props.registerFormData;
    if (!isEmpty(fields)) {
      this.formConfig.fields = {
        ...this.formConfig.fields,
        username: {
          jsonPath: "User.username",
          value: fields.phone.value,
        },
        name: {
          jsonPath: "User.name",
          value: fields.name.value,
        },
        tenantId: {
          jsonPath: "User.tenantId",
          value: fields.city.value,
        },
      };
    }
    // }
    // else {
    //   let { fields } = this.props.loginFormData;
    //   this.formConfig.fields = {
    //     ...this.formConfig.fields,
    //     username: {
    //       jsonPath: "username",
    //       value: fields.phone.value,
    //     },
    //     scope: {
    //       jsonPath: "login.scope",
    //       value: "read",
    //     },
    //     grant_type: {
    //       jsonPath: "login.grant_type",
    //       value: "password",
    //     },
    //     tenantId: {
    //       jsonPath: "login.tenantId",
    //       value: "PB",
    //     },
    //   };
    // }
    this.props.initForm(this.formConfig);
    const otpElement = document.getElementById("otp");
    otpElement.addEventListener("smsReceived", (e) => {
      const { otp } = e.detail;
      this.props.handleFieldChange("otp", "otp", otp);
    });
    // } else {
    //redirect back to register screen
    // setRoute("/citizen/user/register");
    // }
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
  const registerFormData = state.form["register"] || {};
  const loginFormData = state.form["login"] || {};
  return { form, registerFormData, loginFormData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
