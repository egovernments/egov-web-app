import React from "react";
import { Card } from "components";
import Field from "egov-ui-kit/utils/field";

const GenericForm = ({ form, handleFieldChange, formKey }) => {
  const fields = form.fields || {};
  console.log(form);
  return (
    <Card
      textChildren={
        <div className={`${formKey} col-xs-12`}>
          {Object.keys(fields).map((fieldKey, index) => {
            return (
              <div key={index} className={fields[fieldKey].numCols ? `col-xs-${fields[fieldKey].numCols}` : `col-xs-6`}>
                <Field fieldKey={fieldKey} field={fields[fieldKey]} handleFieldChange={handleFieldChange} />
              </div>
            );
          })}
        </div>
      }
    />
  );
};
export default GenericForm;
