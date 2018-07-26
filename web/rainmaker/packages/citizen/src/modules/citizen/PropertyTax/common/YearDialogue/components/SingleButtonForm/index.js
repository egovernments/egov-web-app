import React from "react";
import { Link } from "react-router-dom";
import { Button } from "components";
import "./index.css";

const SingleButtonForm = ({ label, form, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <Link to="/property-tax/assessment-form?type=new">
      <Button
        {...fields.button}
        onClick={() => {
          handleFieldChange("button", label);
        }}
        className="year-range-button"
        label={label}
        labelColor="#00bbd3"
        buttonStyle={{ borderRadius: "50px", border: "1px solid #00bbd3" }}
      />
    </Link>
  );
};

export default SingleButtonForm;
