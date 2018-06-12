import React from "react";
import { Card, ToolTipUi } from "components";
import Field from "egov-ui-kit/utils/field";

const GenericForm = ({ form, handleFieldChange, formKey }) => {
  const fields = form.fields || {};
  return (
    <Card
      textChildren={
        <div className={`${formKey} col-xs-12`}>
          {Object.keys(fields).map((fieldKey, index) => {
            return (
              <div
                style={fields[fieldKey].toolTip ? { display: "flex", alignItems: "center" } : {}}
                key={index}
                className={fields[fieldKey].numCols ? `col-xs-${fields[fieldKey].numCols}` : `col-xs-6`}
              >
                <Field fieldKey={fieldKey} field={fields[fieldKey]} handleFieldChange={handleFieldChange} />
                {fields[fieldKey].toolTip && <ToolTipUi title={fields[fieldKey].toolTipMessage} />}
              </div>
            );
          })}
        </div>
      }
    />
  );
};
export default GenericForm;
