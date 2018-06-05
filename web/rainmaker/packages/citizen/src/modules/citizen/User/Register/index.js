import React, { Component } from "react";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import RegisterForm from "./components/RegisterForm";
import { Banner } from "modules/common";
import { Screen } from "modules/common";

const RegisterFormHOC = formHoc({ formKey: "register" })(RegisterForm);

class Register extends Component {
  render() {
    return (
      <Screen>
        <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
          <RegisterFormHOC />
        </Banner>
      </Screen>
    );
  }
}

export default Register;
