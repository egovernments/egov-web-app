import React from "react";
import { Card, TextField, DropDown, Button } from "components";
import AdditionalDetailsCard from "../AdditionalDetails";
import ComplaintTypeCard from "../ComplaintType";

const AddComplaintForm = ({ formKey, localizationLabels, handleFieldChange, form, categories, history }) => {
  const fields = form.fields || {};
  const { name, phone, mohalla, city, address, landmark } = fields;
  const submit = form.submit;
  return (
    <div className="create-complaint-main-cont">
      {/* <Label label="Complaint Submission" fontSize={20} dark={true} bold={true} containerStyle={{ padding: "24px 0 8px 17px" }} /> */}
      <div className="create-comp-csr-form-cont form-without-button-cont-generic">
        <Card
          id="create-complaint-card"
          className="create-complaint-main-card"
          textChildren={
            <div className="col-xs-12" style={{ padding: 0 }}>
              <div className="col-sm-6 col-xs-12">
                <TextField
                  className="fix-for-layout-break"
                  {...name}
                  name="create-complaint"
                  onChange={(e, value) => handleFieldChange("name", value)}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <TextField
                  className="fix-for-layout-break"
                  {...phone}
                  name="complainant-mobile-no"
                  onChange={(e, value) => handleFieldChange("phone", value)}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <ComplaintTypeCard
                  className="fix-for-layout-break"
                  localizationLabels={localizationLabels}
                  categories={categories}
                  complaintType={fields.complaintType}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <AdditionalDetailsCard
                  className="fix-for-layout-break"
                  handleFieldChange={handleFieldChange}
                  additionalDetails={fields.additionalDetails}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <TextField
                  className="fix-for-layout-break"
                  {...address}
                  name="complainant-mobile-no"
                  onChange={(e, value) => handleFieldChange("address", value)}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <DropDown
                  className="fix-for-layout-break"
                  fullWidth={true}
                  {...city}
                  onChange={(e, value, selectedValue) => handleFieldChange("city", selectedValue)}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <DropDown
                  className="fix-for-layout-break"
                  fullWidth={true}
                  {...mohalla}
                  onChange={(e, value, selectedValue) => handleFieldChange("mohalla", selectedValue)}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <TextField
                  className="fix-for-layout-break"
                  {...landmark}
                  onChange={(e, value) => handleFieldChange("landmark", value)}
                  name="landmark-details"
                />
              </div>
            </div>
          }
        />
      </div>
      <div className="responsive-action-button-cont">
        <Button
          primary={true}
          fullWidth={true}
          style={{ width: 230, boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
          {...submit}
          className="responsive-action-button"
        />
      </div>
    </div>
  );
};

export default AddComplaintForm;
