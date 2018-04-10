import React from "react";
import { Button, TextField } from "components";
import Label from "utils/translationNode";

const ProfileForm = ({ formKey, form, onChange, submitForm, onClickChangePasswd }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div className="profileFormContainer">
      <form>
        <TextField {...fields.name} onChange={(e, value) => onChange(formKey, "name", value)} />
        <TextField {...fields.phonenumber} />
        <TextField {...fields.email} onChange={(e, value) => onChange(formKey, "email", value)} />
      </form>
      <div style={{ marginTop: "24px", marginBottom: "24px" }} onClick={onClickChangePasswd}>
        <Label label={"CHANGE PASSWORD"} color="#f89a3f" />
      </div>
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 profileBtnWrapper">
        <Button className="profileBtn" {...submit} primary={true} fullWidth={true} onClick={() => submitForm(formKey)} />
      </div>
    </div>
  );
};

export default ProfileForm;
