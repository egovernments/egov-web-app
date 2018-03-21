import React from "react";
import { Card, TextFieldIcon } from "../../../../components";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import "./index.css";

const ComplaintTypeField = ({ onClick, complaintType }) => {
  return (
    <div className="complaint-type-main-cont">
      <Card
        className="complaint-type-card common-padding-for-new-complaint-card"
        textChildren={
          <div>
            <TextFieldIcon
              onClick={onClick}
              value={complaintType}
              floatingLabelText="Complaint Type"
              hintText="Select Complaint Type"
              iconPosition="after"
              fullWidth={true}
              Icon={DownArrow}
              id="complaint-type"
              name="complaint-type"
              isRequired={true}
            />
          </div>
        }
      />
    </div>
  );
};

export default ComplaintTypeField;
