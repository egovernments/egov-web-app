import React from "react";
import { Checkbox } from "../../../../../components";
import "./index.css";

const checkboxOptions = [
  { value: "Services", label: "Services" },
  { value: "Resolution Time", label: "Resolution Time" },
  { value: "Quality of work", label: "Quality of work" },
  { value: "Others", label: "Others" },
];

const CheckboxGroup = ({ selected, onCheck }) => {
  return (
    <div>
      <span className="what-was-good">What was good ?</span>
      <Checkbox
        labelStyle={{ letterSpacing: "0.6px" }}
        options={checkboxOptions}
        containerClassName={"feedback-checkbox-cont"}
        selected={selected}
        onCheck={onCheck}
        id="feedback-checkbox"
      />
    </div>
  );
};

export default CheckboxGroup;
