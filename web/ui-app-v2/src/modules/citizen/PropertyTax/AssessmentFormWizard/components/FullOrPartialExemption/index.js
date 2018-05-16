import React from "react";
import { TextField, DropDown } from "components";

const FullOrPartialExemption = ({ referenceID, proof }) => {
  return (
    <div className="exemption-form-cont">
      <form>
        <DropDown
          dropDownData={[{ label: "Category 1", value: "c1" }, { label: "Category 2", value: "c2" }]}
          floatingLabelText="Category"
          hintText="Select"
          required={true}
          fullWidth={true}
        />
        <TextField
          onChange={() => {}}
          id="referenceID"
          disabled={false}
          value={referenceID}
          fullWidth={true}
          hintText="Enter Reference ID"
          floatingLabelText="Reference ID"
        />
        <TextField
          onChange={() => {}}
          id="proof"
          disabled={false}
          value={proof}
          fullWidth={true}
          hintText="Upload a copy of proof"
          floatingLabelText="Proof"
        />
      </form>
    </div>
  );
};

export default FullOrPartialExemption;
