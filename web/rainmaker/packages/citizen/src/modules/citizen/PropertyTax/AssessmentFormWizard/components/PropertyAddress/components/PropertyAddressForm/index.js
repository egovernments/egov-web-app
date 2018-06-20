import React from "react";
import { Card } from "components";
import Field from "egov-ui-kit/utils/field";

const PropertyAddressForm = ({ form, handleFieldChange }) => {
  const fields = form.fields || {};
  console.log(form);
  return (
    <Card
      textChildren={
        <div className="pt-property-address col-xs-12">
          {Object.keys(fields).map((fieldKey, index) => {
            return (
              <div className="col-xs-6">
                <Field fieldKey={fieldKey} field={fields[fieldKey]} handleFieldChange={handleFieldChange} />
              </div>
            );
          })}

          {/* <Link to="/citizen/map?propertyTax">
        <TextFieldIcon id="pt-location" {...fields.location} iconPosition="after" Icon={TrackIcon} />
      </Link> */}
        </div>
      }
    />
  );
};
export default PropertyAddressForm;
