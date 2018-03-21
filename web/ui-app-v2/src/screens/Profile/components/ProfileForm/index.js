import React from "react";
import { Button, TextField } from "../../../../components";
import CityPicker from "../../../common/CityPicker";

const ProfileForm = ({ name, emailId, handleMailChange, handleNameChange }) => {
  return (
    <div>
      <form className="profileFormContainer">
        <TextField
          className="profile-form-field"
          id="profile-form-name"
          fullWidth={true}
          value={name}
          hintText="Enter your Name"
          floatingLabelText="Name"
          onChange={handleNameChange}
          isRequired={true}
        />
        <CityPicker />
        <TextField
          className="profile-form-field"
          id="profile-form-email"
          fullWidth={true}
          value={emailId}
          floatingLabelText="Email Id"
          hintText="Enter your Email Id"
          onChange={handleMailChange}
        />
      </form>
      <div className="profileBtnWrapper">
        <Button className="profileBtn" id="profile-save-action" primary={true} label="SAVE" fullWidth={true} onClick={this.onSaveClick} />
      </div>
    </div>
  );
};

export default ProfileForm;
