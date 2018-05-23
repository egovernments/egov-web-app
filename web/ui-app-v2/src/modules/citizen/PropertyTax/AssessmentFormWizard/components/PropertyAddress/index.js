import React from "react";
import { Label, TextField, TextFieldIcon, Icon } from "components";
import { Link } from "react-router-dom";
import TrackIcon from "material-ui/svg-icons/maps/my-location";

const PropertyAddress = ({ form, wizardFields, handleFieldChange }) => {
  const fields = wizardFields(form.fields || {});

  return (
    <div className="pt-property-address">
      <TextField {...fields.propertyNumber} onChange={(e, value) => handleFieldChange("propertyNumber", value)} maxLength="250" />
      <TextField {...fields.colony} onChange={(e, value) => handleFieldChange("colony", value)} maxLength="250" />
      <TextField {...fields.street} onChange={(e, value) => handleFieldChange("street", value)} maxLength="250" />
      <Link to="/citizen/map?propertyTax">
        <TextFieldIcon id="pt-location" {...fields.location} iconPosition="after" Icon={TrackIcon} />
      </Link>
    </div>
  );
};
export default PropertyAddress;
