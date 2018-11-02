import React from "react";
import { Card, TextFieldIcon } from "components";
import { Link } from "react-router-dom";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import "./index.css";

const ComplaintTypeField = ({ categories, localizationLabels, complaintType = {}, ...rest }) => {
  const complainTypeMessage =
    (complaintType && complaintType.value && (localizationLabels["SERVICEDEFS." + (complaintType.value || "").toUpperCase()] || {}).message) || "";

  return (
    <div className="complaint-type-main-cont">
      <Card
        className="complaint-type-card common-padding-for-new-complaint-card"
        textChildren={
          <Link to="/complaint-type">
            <TextFieldIcon
              {...{ ...complaintType, value: complainTypeMessage }}
              iconPosition="after"
              fullWidth={true}
              Icon={DownArrow}
              iconStyle={{ marginTop: "9px" }}
              name="complaint-type"
              disabled={false}
              {...rest}
            />
          </Link>
        }
      />
    </div>
  );
};

export default ComplaintTypeField;
