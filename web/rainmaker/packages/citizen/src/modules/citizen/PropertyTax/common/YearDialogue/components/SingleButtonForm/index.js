import React from "react";
import { Link } from "react-router-dom";
import { Button } from "components";
import "./index.css";

const SingleButtonForm = ({ label, form, handleFieldChange, history }) => {
  const fields = form.fields || {};
  return (
    <Button
      {...fields.button}
      onClick={() => {
        handleFieldChange("button", label);
        history && history.push(`/property-tax/assessment-form?financialYear=${label}&type=new`);
        console.log(label);
      }}
      className="year-range-button"
      label={label}
      labelColor="#00bbd3"
      buttonStyle={{ borderRadius: "50px", border: "1px solid #00bbd3" }}
    />
  );
};

export default SingleButtonForm;
