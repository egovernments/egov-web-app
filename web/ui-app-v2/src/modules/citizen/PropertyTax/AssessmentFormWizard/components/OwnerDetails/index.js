import React from "react";
import { Card, TextField, MobileNumberField, Icon } from "components";
import "./index.css";

const OwnerDetails = ({ fields, handleFieldChange }) => {
  return (
    <div className="owner-details-form-cont">
      <form>
        <TextField id="owner-name" onChange={(e, value) => handleFieldChange("name", value)} {...fields.name} />
        <TextField id="father-or-husband-name" onChange={(e, value) => handleFieldChange("fatherHusbandName", value)} {...fields.fatherHusbandName} />
        <TextField id="aadhar-no" {...fields.aadharNumber} onChange={(e, value) => handleFieldChange("aadharNumber", value)} />
        <MobileNumberField id="mobile-no" {...fields.mobileNumber} onChange={(e, value) => handleFieldChange("mobileNumber", value)} />
        <TextField id="address" {...fields.address} onChange={(e, value) => handleFieldChange("address", value)} />
      </form>
    </div>
  );
};

export default OwnerDetails;
