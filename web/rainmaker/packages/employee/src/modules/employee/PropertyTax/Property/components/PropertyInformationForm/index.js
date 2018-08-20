import React from "react";
import { Screen } from "modules/common";
import { OwnerInfoHOC } from "../../../FormWizard/components/Forms";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../../../FormWizard/components/GenericForm";
import "./index.css";

const PropertyAddressHOC = formHoc({ formKey: "propertyAddress", path: "PropertyTaxPay" })(GenericForm);

const PropertyInformation = () => {
  return (
    <Screen>
      <div className="form-without-button-cont-generic">
        <PropertyAddressHOC />
        <OwnerInfoHOC />
      </div>
    </Screen>
  );
};

export default PropertyInformation;
