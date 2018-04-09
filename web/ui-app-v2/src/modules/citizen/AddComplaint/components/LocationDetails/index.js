import React from "react";
import { Card, TextFieldIcon, TextField } from "../../../../../components";
import TrackIcon from "material-ui/svg-icons/maps/my-location";
import "./index.css";

const LocationDetailsCard = ({ locationDetails, landmark, onChange, locationOnClick }) => {
  return (
    <div className="location-details-main-cont">
      <Card
        className="location-details-card common-padding-for-new-complaint-card"
        textChildren={
          <div>
            <div>
              <div onClick={locationOnClick}>
                <TextFieldIcon
                  id="addComplaint-location-details"
                  {...locationDetails}
                  iconPosition="after"
                  fullWidth={true}
                  Icon={TrackIcon}
                  name="location-details"
                  isRequired={true}
                />
              </div>
              <TextField
                id="addComplaint-landmark-details"
                {...landmark}
                onChange={onChange}
                name="landmark-details"
                isRequired={false}
                fullWidth={true}
                maxLength="50"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default LocationDetailsCard;
