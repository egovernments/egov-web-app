import React from "react";
import { Card, TextFieldIcon, TextField } from "components";
import { Link } from "react-router-dom";
import TrackIcon from "material-ui/svg-icons/maps/my-location";

const LocationDetails = ({ formKey, locationDetails, landmark, handleFieldChange }) => {
  return (
    <div className="location-details-main-cont">
      <div>
        <Link to={`/employee/map?${formKey}`}>
          <TextFieldIcon id="addComplaint-location-details" {...locationDetails} iconPosition="after" Icon={TrackIcon} name="location-details" />
        </Link>
      </div>
    </div>
  );
};

export default LocationDetails;
