import React from "react";
import { Label, Card, TextField, DropDown, Button } from "components";
import LocationDetailsCard from "../LocationDetails";
import AdditionalDetailsCard from "../AdditionalDetails";
import ComplaintTypeCard from "../ComplaintType";

const AddComplaintForm = ({ formKey, localizationLabels, handleFieldChange, form, categories, history }) => {
  const fields = form.fields || {};
  const { name, phone, mohalla, city, address, landmark } = fields;
  const submit = form.submit;
  return (
    <div className="create-complaint-main-cont">
      <Label label="Complaint Submission" labelStyle={{ fontSize: 20, color: "#484848", margin: "24px 16px 0px 8px" }} />
      <Card
        id="create-complaint-card"
        className="create-complaint-main-card"
        textChildren={
          <div className="col-xs-12">
            <div className="col-xs-6">
              <TextField {...name} name="create-complaint" onChange={(e, value) => handleFieldChange("name", value)} />
            </div>
            <div className="col-xs-6">
              <TextField {...phone} name="complainant-mobile-no" onChange={(e, value) => handleFieldChange("phone", value)} />
            </div>
            <div className="col-xs-6">
              <ComplaintTypeCard localizationLabels={localizationLabels} categories={categories} complaintType={fields.complaintType} />
            </div>
            <div className="col-xs-6">
              <AdditionalDetailsCard handleFieldChange={handleFieldChange} additionalDetails={fields.additionalDetails} />
            </div>
            <div className="col-xs-6">
              <DropDown {...city} onChange={(e, value, selectedValue) => handleFieldChange("city", selectedValue)} />
            </div>
            <div className="col-xs-6">
              <DropDown {...mohalla} onChange={(e, value, selectedValue) => handleFieldChange("mohalla", selectedValue)} />
            </div>
            <div className="col-xs-6">
              <TextField {...landmark} onChange={(e, value) => handleFieldChange("landmark", value)} name="landmark-details" />
            </div>
            <div className="col-xs-6">
              <LocationDetailsCard formKey={formKey} handleFieldChange={handleFieldChange} locationDetails={address} history={history} />
            </div>
          </div>
        }
      />
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8">
        <Button
          primary={true}
          fullWidth={true}
          style={{ boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
          {...submit}
          className="create-complaint-submit-button"
        />
      </div>
    </div>
  );
};

export default AddComplaintForm;
