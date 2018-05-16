import React from "react";
import { TextField, DropDown } from "components";

const TaxAssessmentDetailsOne = ({ plotSize }) => {
  return (
    <div className="tax-assessment-details-cont-1">
      <form>
        <DropDown
          dropDownData={[{ label: "property1", value: "prop1" }, { label: "property2", value: "prop2" }]}
          floatingLabelText="Type of Property"
          hintText="Select"
          required={true}
          fullWidth={true}
        />
        <TextField
          onChange={() => {}}
          id="plot-size"
          disabled={false}
          value={plotSize}
          fullWidth={true}
          hintText="Mention in sq ft"
          floatingLabelText="Plot Size"
        />
        <DropDown
          dropDownData={[{ label: "1", value: "1" }, { label: "2", value: "2" }]}
          floatingLabelText="No. of Floors"
          hintText="Mention in sq ft"
          required={true}
          fullWidth={true}
        />
      </form>
    </div>
  );
};

export default TaxAssessmentDetailsOne;
