import React from "react";
import { TextField, DropDown } from "components";

const TaxAssessmentDetailsOne = ({ fields, handleFieldChange }) => {
  return (
    <div className="tax-assessment-details-cont-1">
      <form>
        <DropDown
          onChange={(e, value) => handleFieldChange("propertyType", value)}
          {...fields.propertyType}
          dropDownData={[{ label: "property1", value: "prop1" }, { label: "property2", value: "prop2" }]}
          fullWidth={true}
        />
        <TextField {...fields.plotSize} onChange={(e, value) => handleFieldChange("plotSize", value)} id="plot-size" />
        <DropDown
          {...fields.floorCount}
          onChange={(e, value) => handleFieldChange("floorCount", value)}
          dropDownData={[{ label: "1", value: "1" }, { label: "2", value: "2" }]}
          fullWidth={true}
        />
      </form>
    </div>
  );
};

export default TaxAssessmentDetailsOne;
