import React from "react";
import { TextField, DropDown } from "components";

const TaxAssessmentDetailsTwo = ({ builtUpArea1, builtUpArea2 }) => {
  return (
    <div className="tax-assessment-details-cont-2">
      <form>
        <TextField
          onChange={() => {}}
          id="built-up-area-1"
          disabled={false}
          value={builtUpArea1}
          fullWidth={true}
          hintText="Mention in sq ft"
          floatingLabelText="Floor 1 Built-up area"
        />
        <TextField
          onChange={() => {}}
          id="built-up-area-2"
          disabled={false}
          value={builtUpArea2}
          fullWidth={true}
          hintText="Mention in sq ft"
          floatingLabelText="Floor 2 Built-up area"
        />
      </form>
    </div>
  );
};

export default TaxAssessmentDetailsTwo;
