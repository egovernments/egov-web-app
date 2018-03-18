import React from "react";
import { Card, TextFieldIcon, TextField } from "../../../../components";
import TrackIcon from "material-ui/svg-icons/maps/my-location";
import "./index.css";

const LocationDetailsCard = ({ locationDetails, landmark, onChange }) => {
  return (
    <div className="location-details-main-cont">
      <Card
        className="location-details-card common-padding-for-new-complaint-card"
        textChildren={
          <div>
            <TextFieldIcon
              value={locationDetails}
              floatingLabelText="Location"
              hintText="Search Location"
              iconPosition="after"
              fullWidth={true}
              Icon={TrackIcon}
              id="location-details"
              name="location-details"
              isRequired={true}
            />
            <TextField
              value={landmark}
              onChange={onChange}
              name="landmark-details"
              isRequired={false}
              hintText="Enter Landmark"
              id="landmark-details"
              fullWidth={true}
              floatingLabelText="Landmark"
            />
          </div>
        }
      />
    </div>
  );
};

export default LocationDetailsCard;
