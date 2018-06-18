import React from "react";
import { Button, Card, TextField } from "components";
import LocationDetailsCard from "../LocationDetails";
import AdditionalDetailsCard from "../AdditionalDetails";
import ComplaintTypeCard from "../ComplaintType";
import { ActionFooter } from "modules/common";

const AddComplaintForm = ({ formKey, localizationLabels, handleFieldChange, form, categories }) => {
  const fields = form.fields || {};
  const { name, phone } = fields;
  const submit = form.submit;
  console.log(fields);
  return (
    <div className="create-complaint-main-cont">
      <Card
        id="create-complaint-card"
        className="create-complaint-main-card"
        textChildren={
          <div className="col-xs-12">
            <TextField
              id={name && name.id}
              name="create-complaint"
              value=""
              hintText={name && name.hintText}
              floatingLabelText={name && name.floatingLabelText}
              onChange={(e, value) => handleFieldChange("additionalDetails", value)}
            />
            <TextField
              id={phone && phone.id}
              name="complainant-mobile-no"
              value=""
              hintText={phone && phone.hintText}
              floatingLabelText={phone && phone.floatingLabelText}
              onChange={(e, value) => handleFieldChange("additionalDetails", value)}
            />
            <ComplaintTypeCard localizationLabels={localizationLabels} categories={categories} complaintType={fields.complaintType} />
            <LocationDetailsCard
              formKey={formKey}
              handleFieldChange={handleFieldChange}
              landmark={fields.landmark}
              locationDetails={fields.address}
            />
            <AdditionalDetailsCard handleFieldChange={handleFieldChange} additionalDetails={fields.additionalDetails} />
          </div>
        }
      />
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 add-complaint-button-cont btn-without-bottom-nav">
        <ActionFooter label2={"SUBMIT COMPLAINT"} />
      </div>
    </div>
  );
};

export default AddComplaintForm;
