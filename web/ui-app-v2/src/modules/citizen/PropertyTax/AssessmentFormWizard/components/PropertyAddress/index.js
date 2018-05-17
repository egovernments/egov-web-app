import React from "react";
import { Label, TextField, TextFieldIcon, Icon } from "components";
import { Link } from "react-router-dom";
import TrackIcon from "material-ui/svg-icons/maps/my-location";

const PropertyAddress = ({ propertyNo, areaName, street, propertyNoOnchange, areaNameOnChange, streetOnChange }) => {
  return (
    <div className="pt-property-address">
      <TextField
        id=""
        hintText="Enter House/Property no."
        floatingLabelText="House/Property No."
        name="house-no"
        value={propertyNo}
        isRequired={true}
        onChange={propertyNoOnchange}
        fullWidth={true}
        maxLength="250"
      />
      <TextField
        id=""
        hintText="Enter Area name"
        floatingLabelText="Colony/Mohalla Area"
        name="area-name"
        value={areaName}
        onChange={areaNameOnChange}
        isRequired={true}
        fullWidth={true}
        maxLength="250"
      />
      <TextField
        id=""
        hintText="Enter street name"
        floatingLabelText="Street Name"
        name="street-name"
        value={street}
        onChange={streetOnChange}
        isRequired={true}
        fullWidth={true}
        maxLength="250"
      />
      <Link to="/citizen/map">
        <TextFieldIcon
          name="pt-location"
          isRequired={false}
          hintText="Select Location"
          floatingLabelText="Location"
          id="pt-location"
          iconPosition="after"
          fullWidth={true}
          Icon={TrackIcon}
        />
      </Link>
    </div>
  );
};
export default PropertyAddress;
