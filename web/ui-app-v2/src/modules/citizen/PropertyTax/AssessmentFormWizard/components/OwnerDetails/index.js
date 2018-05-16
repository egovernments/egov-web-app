import React from "react";
import { Card, TextField, Icon } from "components";
import "./index.css";

const iconStyle = {
  display: "inline-block",
};
const OwnerDetails = ({ name, guardianName, mobileNo, aadharNo, address }) => {
  return (
    <div className="owner-details-form-cont">
      <form>
        <TextField
          onChange={() => {}}
          id="owner-name"
          disabled={false}
          value={name}
          fullWidth={true}
          hintText="Enter your name"
          floatingLabelText="Name"
          required={true}
        />
        <TextField
          onChange={() => {}}
          id="father/husband-name"
          disabled={false}
          value={guardianName}
          fullWidth={true}
          hintText="Enter Father/Husband Name"
          floatingLabelText="Father/Husband Name"
        />
        <TextField
          onChange={() => {}}
          id="aadhar-no"
          disabled={false}
          value={aadharNo}
          fullWidth={true}
          hintText="Enter Aadhar No."
          floatingLabelText="Aadhar No."
        />
        <TextField
          onChange={() => {}}
          id="mobile-no"
          disabled={false}
          value={mobileNo}
          fullWidth={true}
          hintText="Enter Phone Number"
          floatingLabelText="Mobile No."
        />
        <TextField
          onChange={() => {}}
          id="address"
          disabled={false}
          value={address}
          fullWidth={true}
          hintText="Enter Correspondence Address"
          floatingLabelText="Correspondence Address"
        />
      </form>
    </div>
  );
};

export default OwnerDetails;
