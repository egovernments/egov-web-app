import React from "react";
import { Button, TextField } from "components";
import CityPicker from "modules/common/CityPicker";

const ProfileForm = ({ formKey, form, onChange, submitForm }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(formKey);
        }}
        className="profileFormContainer"
      >
        <TextField {...fields.name} onChange={(e, value) => onChange(formKey, "name", value)} />
        <CityPicker onChange={onChange} formKey={formKey} fieldKey="city" field={fields.city} />
        <TextField {...fields.email} onChange={(e, value) => onChange(formKey, "email", value)} />
      </form>
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 profileBtnWrapper">
        <Button className="profileBtn" {...submit} primary={true} fullWidth={true} />
      </div>
    </div>
  );
};

export default ProfileForm;
