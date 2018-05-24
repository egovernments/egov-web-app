import React from "react";
import Field from "utils/field";
import { Button } from "components";
import CityPicker from "modules/common/common/CityPicker";

const ProfileForm = ({ form, handleFieldChange }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div>
      <Field form={form} handleFieldChange={handleFieldChange} fieldKey="name" />
      <CityPicker onChange={handleFieldChange} fieldKey="city" field={fields.city} />
      <Field form={form} handleFieldChange={handleFieldChange} fieldKey="email" />
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 btn-without-bottom-nav profileBtnWrapper">
        <Button className="profileBtn" {...submit} primary={true} fullWidth={true} />
      </div>
    </div>
  );
};

export default ProfileForm;
