import React from "react";
import { Button, Card, TextField, DropDown } from "components";
import LocationDetailsCard from "../LocationDetails";
import AdditionalDetailsCard from "../AdditionalDetails";
import ComplaintTypeCard from "../ComplaintType";
import { ActionFooter } from "modules/common";

const AddComplaintForm = ({ formKey, localizationLabels, handleFieldChange, form, categories }) => {
  const fields = form.fields || {};
  const { name, phone, mohalla, city, address } = fields;
  const submit = form.submit;
  console.log(fields);
  return (
    <div className="create-complaint-main-cont">
      <Card
        id="create-complaint-card"
        className="create-complaint-main-card"
        textChildren={
          <div className="col-xs-12">
            <div className="col-xs-6">
              <TextField
                id={name && name.id}
                name="create-complaint"
                value=""
                hintText={name && name.hintText}
                floatingLabelText={name && name.floatingLabelText}
                onChange={(e, value) => handleFieldChange("additionalDetails", value)}
              />
            </div>
            <div className="col-xs-6">
              <TextField
                id={phone && phone.id}
                name="complainant-mobile-no"
                value=""
                hintText={phone && phone.hintText}
                floatingLabelText={phone && phone.floatingLabelText}
                onChange={(e, value) => handleFieldChange("additionalDetails", value)}
              />
            </div>
            <div className="col-xs-6">
              <ComplaintTypeCard localizationLabels={localizationLabels} categories={categories} complaintType={fields.complaintType} />
            </div>
            <div className="col-xs-6">
              <AdditionalDetailsCard handleFieldChange={handleFieldChange} additionalDetails={fields.additionalDetails} />
            </div>
            <div className="col-xs-6">
              <DropDown
                value={""}
                hintText={city && city.hintText}
                floatingLabelText={city && city.floatingLabelText}
                dropDownData={[]}
                onChange={(e, value, selectedValue) => handleFieldChange(selectedValue)}
              />
            </div>
            <div className="col-xs-6">
              <DropDown
                value={""}
                dropDownData={[]}
                hintText={mohalla && mohalla.hintText}
                floatingLabelText={mohalla && mohalla.floatingLabelText}
                onChange={(e, value, selectedValue) => handleFieldChange(selectedValue)}
              />
            </div>
            <div className="col-xs-6">
              <TextField
                id={address && address.id}
                name="complainant-mobile-no"
                value=""
                hintText={address && address.hintText}
                floatingLabelText={address && address.floatingLabelText}
                onChange={(e, value) => handleFieldChange("additionalDetails", value)}
              />
            </div>
            <div className="col-xs-6">
              <LocationDetailsCard
                formKey={formKey}
                handleFieldChange={handleFieldChange}
                landmark={fields.landmark}
                locationDetails={fields.location}
              />
            </div>
          </div>
        }
      />
      <div className="" style={{ textAlign: "inherit" }}>
        <ActionFooter label2={"SUBMIT COMPLAINT"} />
      </div>
    </div>
  );
};

export default AddComplaintForm;
