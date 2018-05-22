import React from "react";
import { Button, TextField } from "components";
import CityPicker from "modules/common/common/CityPicker";

const ProfileForm = ({ form, handleFieldChange }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div>
      <TextField {...fields.name} onChange={(e, value) => handleFieldChange("name", value)} />
      <CityPicker onChange={handleFieldChange} fieldKey="city" field={fields.city} />
      <TextField {...fields.email} onChange={(e, value) => handleFieldChange("email", value)} />
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 profileBtnWrapper">
        <Button className="profileBtn" {...submit} primary={true} fullWidth={true} />
      </div>
    </div>
  );
};

export default ProfileForm;
