import React from "react";
import { Card, TextField } from "../../../../../components";
import "./index.css";

const AdditionalDetailsCard = ({ additionalDetails = "", onChange }) => {
  return (
    <div className="additional-details-main-cont">
      <Card
        className="additional-details-card common-padding-for-new-complaint-card"
        textChildren={
          <div>
            <TextField
              id="addComplaint-additional-details"
              {...additionalDetails}
              onChange={onChange}
              name="additional-details"
              isRequired={false}
              fullWidth={true}
            />
          </div>
        }
      />
    </div>
  );
};

export default AdditionalDetailsCard;
