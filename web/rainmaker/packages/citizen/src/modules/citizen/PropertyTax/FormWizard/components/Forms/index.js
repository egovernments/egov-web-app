import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../GenericForm";
import Field from "egov-ui-kit/utils/field";
import { RadioButton, Card, Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const options = [
  { value: "Male", label: <Label label="Male" /> },
  { value: "Female", label: <Label label="Female" /> },
  { value: "Transgender", label: <Label label="Transgender" /> },
];

const guardianOptions = [{ value: "Husband", label: <Label label="Husband" /> }, { value: "Father ", label: <Label label="Father" /> }];

const styles = {
  labelStyle: {
    color: "rgb(0, 188, 209)",
    font: "12px",
    letterSpacing: 0.6,
    marginBottom: 5,
    marginTop: 14,
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px",
  },
  selectedLabelStyle: {
    color: "#00bbd3",
  },
  radioButtonLabelStyle: {
    lineHeight: 1,
    marginBottom: 8,
  },
  iconStyle: {
    width: 16,
    height: 16,
  },
};

const OwnerInformation = ({ form, formKey, handleFieldChange, cardTitle, deleteBtn, deleteOwner, handleChange, handleGuardianChange }) => {
  const fields = form.fields || {};
  return (
    <Card
      textChildren={
        <div className="col-xs-12 pt-owner-info">
          <div>
            <div>{cardTitle}</div>
            {deleteBtn && (
              <div
                className="pt-ownerinfo-deletebtn"
                onClick={() => {
                  deleteOwner(formKey, form);
                }}
              >
                <Icon action="content" name="clear" />
              </div>
            )}
          </div>
          <div className="col-xs-6">
            <Field fieldKey="ownerName" field={fields["ownerName"]} handleFieldChange={handleFieldChange} />
          </div>
          <div className="col-xs-6" style={{ height: 72 }}>
            <Label label={"Gender"} fontSize={12} labelStyle={styles.labelStyle} bold={true} />
            <RadioButton
              id="gender-selection"
              name="gender-selection"
              options={options}
              handleChange={handleChange}
              radioButtonItemStyle={styles.radioButtonItemStyle}
              labelStyle={styles.radioButtonLabelStyle}
              selectedLabelStyle={styles.selectedLabelStyle}
              className={"owner-gender-selection"}
              iconStyle={styles.iconStyle}
            />
          </div>
          <div className="col-xs-6">
            <Field fieldKey="ownerMobile" field={fields["ownerMobile"]} handleFieldChange={handleFieldChange} />
          </div>
          <div className="col-xs-6" style={{ display: "flex", alignItems: "center" }}>
            <div className="col-xs-8" style={{ padding: 0 }}>
              <Field fieldKey="ownerGuardian" field={fields["ownerGuardian"]} handleFieldChange={handleFieldChange} />
            </div>
            <div className="col-xs-4" style={{ padding: 0 }}>
              <RadioButton
                id="guardian-selection"
                name="guardian-selection"
                options={guardianOptions}
                handleChange={handleGuardianChange}
                className={"owner-guardian-selection"}
                iconStyle={styles.iconStyle}
                labelStyle={styles.radioButtonLabelStyle}
              />
            </div>
          </div>
          <div className="col-xs-6">
            <Field fieldKey="ownerAadhar" field={fields["ownerAadhar"]} handleFieldChange={handleFieldChange} />
          </div>
          <div className="col-xs-6">
            <Field fieldKey="ownerEmail" field={fields["ownerEmail"]} handleFieldChange={handleFieldChange} />
          </div>
          <div className="col-xs-6">
            <Field fieldKey="ownerAddress" field={fields["ownerAddress"]} handleFieldChange={handleFieldChange} />
          </div>
        </div>
      }
    />
  );
};

const UsageInformationHOC = formHoc({ formKey: "basicInformation", path: "PropertyTaxPay" })(GenericForm);
const PropertyAddressHOC = formHoc({ formKey: "propertyAddress", path: "PropertyTaxPay" })(GenericForm);
const PlotInformationHOC = formHoc({ formKey: "plotInformation", path: "PropertyTaxPay" })(GenericForm);
const OwnershipTypeHOC = formHoc({ formKey: "ownershipType", path: "PropertyTaxPay" })(GenericForm);
const OwnerInfoHOC = formHoc({ formKey: "ownerInfo", path: "PropertyTaxPay" })(OwnerInformation);
const ExemptionCategoryHOC = formHoc({ formKey: "exemptionCategory", path: "PropertyTaxPay" })(GenericForm);
const DynamicFormHoc = (formKey, Form) => {
  return formHoc({ formKey })(Form);
};

export {
  UsageInformationHOC,
  PropertyAddressHOC,
  PlotInformationHOC,
  OwnershipTypeHOC,
  OwnerInfoHOC,
  ExemptionCategoryHOC,
  DynamicFormHoc,
  OwnerInformation,
};
