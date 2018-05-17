import React from "react";
import { TextField } from "components";

const TaxAssessmentDetailsTwo = ({ fields, handleFieldChange }) => {
  return (
    <div className="tax-assessment-details-cont-2">
      <form>
        <TextField {...fields.builtUpArea1} onChange={(e, value) => handleFieldChange("builtUpArea1", value)} id="built-up-area-1" />
        <TextField {...fields.builtUpArea2} onChange={(e, value) => handleFieldChange("buildUpArea2", value)} id="built-up-area-2" />
      </form>
    </div>
  );
};

export default TaxAssessmentDetailsTwo;
