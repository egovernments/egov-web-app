import React from "react";
import { TextFieldIcon } from "components";
import TrackIcon from "material-ui/svg-icons/maps/my-location";

const LocationDetails = ({ formKey, locationDetails, handleFieldChange, history }) => {
  const onIconClick = () => {
    history.push(`/employee/map?${formKey}`);
  };

  return (
    <div className="location-details-main-cont">
      <div>
        <TextFieldIcon
          id="addComplaint-location-details"
          {...locationDetails}
          onIconClick={onIconClick}
          iconPosition="after"
          Icon={TrackIcon}
          name="location-details"
          onChange={(e, value) => handleFieldChange("address", value)}
        />
      </div>
    </div>
  );
};

export default LocationDetails;
