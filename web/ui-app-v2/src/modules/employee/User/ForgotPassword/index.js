import React, { Component } from "react";
import formHoc from "hocs/form";
import Banner from "modules/common/common/Banner";
import Screen from "modules/common/common/Screen";
import ForgotPasswd from "./components/ForgotPasswd";

const ForgotPasswdHOC = formHoc(ForgotPasswd, "employeeForgotPasswd");

const ForgotPassword = () => {
  return (
    <Screen>
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <ForgotPasswdHOC />
      </Banner>
    </Screen>
  );
};

export default ForgotPassword;
