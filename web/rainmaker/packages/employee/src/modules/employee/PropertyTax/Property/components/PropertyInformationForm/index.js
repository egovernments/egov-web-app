import React from "react";
import { Screen } from "modules/common";
import { OwnerInfoHOC } from "../../../FormWizard/components/Forms";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../../../FormWizard/components/GenericForm";
import { ActionFooter } from "modules/common";
import "./index.css";

const buttons = {
  button1: "GO BACK",
  button2: "SAVE",
};

const PropertyAddressHOC = formHoc({ formKey: "propertyInformation", path: "PropertyTaxPay", isCoreConfiguration: true })(GenericForm);

const PropertyInformation = () => {
  return (
    <Screen>
      <div className="form-without-button-cont-generic">
        <PropertyAddressHOC />
        <OwnerInfoHOC checkBox={true} />
        <ActionFooter label1={buttons.button1} label2={buttons.button2} />
      </div>
    </Screen>
  );
};

export default PropertyInformation;
