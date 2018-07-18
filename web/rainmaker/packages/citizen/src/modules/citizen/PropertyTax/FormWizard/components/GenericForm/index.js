import React from "react";
import { Card, ToolTipUi, Icon } from "components";
import Field from "egov-ui-kit/utils/field";

const GenericForm = ({ form, handleFieldChange, formKey, containerStyle, handleRemoveItem }) => {
  const fields = form.fields || {};
  return (
    <Card
      style={containerStyle}
      textChildren={
        <div className={`${formKey} col-xs-12`}>
          {handleRemoveItem && (
            <div className="text-right" style={{ cursor: "pointer" }} onClick={handleRemoveItem}>
              <Icon action="navigation" name="close" />
            </div>
          )}
          {Object.keys(fields).map((fieldKey, index) => {
            return (
              <div>
                {fieldKey === "dummy" ? (
                  <div className="col-xs-6" style={{ height: 72 }} />
                ) : (
                  <div
                    style={fields[fieldKey].toolTip ? { display: "flex", alignItems: "center" } : {}}
                    key={index}
                    className={fields[fieldKey].numcols ? `col-xs-${fields[fieldKey].numcols}` : `col-xs-6`}
                  >
                    <Field fieldKey={fieldKey} field={fields[fieldKey]} handleFieldChange={handleFieldChange} />
                    {fields[fieldKey].toolTip && <ToolTipUi title={fields[fieldKey].toolTipMessage} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      }
    />
  );
};
export default GenericForm;
