import React from "react";
import { Card, ToolTipUi, Icon } from "components";
import Field from "egov-ui-kit/utils/field";
import "./index.css";

const GenericForm = ({ form, handleFieldChange, formKey, containerStyle, handleRemoveItem, disabled, className, formName }) => {
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
          {formName && <div className="text-left">{formName}</div>}
          {Object.keys(fields).map((fieldKey, index) => {
            return (
              // <div key={index}>
              fieldKey === "dummy" ? (
                <div className="col-xs-6" style={{ height: 72, marginTop: 14 }} />
              ) : (
                <div
                  style={fields[fieldKey].toolTip ? { display: "flex", alignItems: "center" } : {}}
                  className={fields[fieldKey].numcols ? (fields[fieldKey].hideField ? "" : `col-xs-${fields[fieldKey].numcols}`) : `col-xs-6`}
                >
                  <Field
                    fieldKey={fieldKey}
                    field={fields[fieldKey]}
                    handleFieldChange={handleFieldChange}
                    disabled={disabled}
                    className={className}
                  />
                  {fields[fieldKey].toolTip &&
                    !fields[fieldKey].hideField && <ToolTipUi id={"form-wizard-tooltip"} title={fields[fieldKey].toolTipMessage} />}
                </div>
              )
              // </div>
            );
          })}
        </div>
      }
      className={className}
    />
  );
};
export default GenericForm;
