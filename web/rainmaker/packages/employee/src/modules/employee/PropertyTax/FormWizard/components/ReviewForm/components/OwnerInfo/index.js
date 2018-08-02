import React from "react";
import { Card } from "components";

const OwnerInfo = ({ form, icon, editIcon, component }) => {
  // const fields = form.fields || {};
  return (
    <Card
      textChildren={
        <div>
          <div className="pt-rf-title">
            <span className="pt-rf-icon">{icon}</span>
            <span className="pt-rf-title-text">Owner Information</span>
            <span className="pt-rf-edit-icon">{editIcon}</span>
          </div>
          {component}
          {/* <div className="pt-review-form col-xs-12">
            {Object.keys(fields).map((fieldKey, index) => {
              const field = { ...fields[fieldKey] };
              field.disabled = true;
              return (
                <div className="col-xs-6">
                  <div className="pt-review-form-field">
                    <Field fieldKey={fieldKey} field={field} />
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
      }
    />
  );
};

export default OwnerInfo;
