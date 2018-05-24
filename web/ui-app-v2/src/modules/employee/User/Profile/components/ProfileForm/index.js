import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "components";
import Label from "utils/translationNode";

const ProfileForm = ({ form, handleFieldChange }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div className="profileFormContainer">
      <TextField {...fields.name} onChange={(e, value) => handleFieldChange("name", value)} />
      <TextField {...fields.phonenumber} />
      <TextField {...fields.email} onChange={(e, value) => handleFieldChange("email", value)} />
      <Link to="/employee/user/change-password">
        <div style={{ marginTop: "24px", marginBottom: "24px" }}>
          <Label label={"CHANGE PASSWORD"} color="#f89a3f" />
        </div>
      </Link>
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 btn-without-bottom-nav profileBtnWrapper">
        <Button className="profileBtn" {...submit} primary={true} fullWidth={true} />
      </div>
    </div>
  );
};

export default ProfileForm;
