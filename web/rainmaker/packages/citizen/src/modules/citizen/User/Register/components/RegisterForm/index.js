import React from "react";
import { Link } from "react-router-dom";
import Field from "egov-ui-kit/utils/field";
import { Button, Card, Image } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { CityPicker } from "modules/common";
import { startSMSRecevier } from "egov-ui-kit/utils/commons";
import logo from "egov-ui-kit/assets/images/logo_black.png";
import "./index.css";

const RegisterForm = ({ handleFieldChange, form }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <Card
      className="col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 user-screens-card "
      textChildren={
        <div>
          <div style={{ marginBottom: "24px" }}>
            <Image className="mseva-logo" source={`${logo}`} />
          </div>
          <Label className="heading text-center" bold={true} dark={true} fontSize={16} label="CORE_REGISTER_HEADING" />
          <Field fieldKey="phone" field={fields.phone} handleFieldChange={handleFieldChange} />
          <Field fieldKey="name" field={fields.name} handleFieldChange={handleFieldChange} />
          {/* <CityPicker onChange={handleFieldChange} fieldKey="city" field={fields.city} /> */}
          <div style={{ marginBottom: "24px" }} className="text-right">
            <Label id="otp-trigger" className="otp-prompt" label="CORE_REGISTER_HAVE_ACCOUNT" />
            <Link to="/citizen/user/login">
              <div style={{ display: "inline-block" }}>
                <Label containerStyle={{ cursor: "pointer" }} id="otp-resend" className="otp-resend" label="CORE_COMMON_LOGIN" />
              </div>
            </Link>
          </div>
          <Button
            primary={true}
            fullWidth={true}
            {...submit}
            onClick={(e) => {
              startSMSRecevier();
            }}
          />
        </div>
      }
    />
  );
};

export default RegisterForm;
