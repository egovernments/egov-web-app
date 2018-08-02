import React from "react";
import { Card } from "components";

const AssessmentInfo = ({ icon, editIcon, component }) => {
  return (
    <Card
      textChildren={
        <div>
          <div className="pt-rf-title">
            <span className="pt-rf-icon">{icon}</span>
            <span className="pt-rf-title-text">Assessment Info</span>
            <span className="pt-rf-edit-icon">{editIcon}</span>
          </div>
          <div className="pt-review-form col-xs-12" >
            {component}
          </div>
        </div>
      }
    />
  );
};

export default AssessmentInfo;
