import React from "react";
import { Card, TextFieldIcon } from "components";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import "./index.css";

const ComplaintTypeField = ({ onClick, categories, complaintType }) => {
  return (
    <div className="complaint-type-main-cont">
      <Card
        className="complaint-type-card common-padding-for-new-complaint-card"
        textChildren={
          <div>
            <TextFieldIcon
              onClick={onClick}
              {...complaintType}
              // value={(complaintType && complaintType.value && categories[complaintType.value] && categories[complaintType.value].serviceName) || ""}
              iconPosition="after"
              fullWidth={true}
              Icon={DownArrow}
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
