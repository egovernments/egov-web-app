import React, { Component } from "react";
import formHoc from "egov-ui-kit/hocs/form";
import { Banner } from "modules/common";
import { Screen } from "modules/common";
import ForgotPasswd from "./components/ForgotPasswd";

const ForgotPasswdHOC = formHoc({ formKey: "employeeForgotPasswd" })(ForgotPasswd);

const ForgotPassword = () => {
  return (
    <Screen>
      <Banner>
        <ForgotPasswdHOC />
      </Banner>
    </Screen>
  );
};

export default ForgotPassword;
