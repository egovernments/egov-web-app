import React from "react";
import Field from "egov-ui-kit/utils/field";
import { Button, Card } from "components";

const SearchPropertyForm = ({ handleFieldChange, form, formKey }) => {
  const fields = form.fields || {};
  const submit = form.submit;

  return (
    <div className="form-without-button-cont-generic">
      <Card
        textChildren={
          <div className={`${formKey} col-xs-12`}>
            {Object.keys(fields).map((fieldKey, index) => {
              return (
                <div
                  style={fields[fieldKey].toolTip ? { display: "flex", alignItems: "center" } : {}}
                  key={index}
                  className={fields[fieldKey].numcols ? `col-xs-${fields[fieldKey].numcols}` : `col-xs-6`}
                >
                  <Field fieldKey={fieldKey} field={fields[fieldKey]} handleFieldChange={handleFieldChange} />
                </div>
              );
            })}
          </div>
        }
      />
      <div className="responsive-action-button-cont">
        <Button
          {...submit}
          className="responsive-action-button"
          //   onClick={() => history.push("/citizen")}
          label="SEARCH"
          primary={true}
          fullWidth={true}
          className="responsive-action-button"
        />
      </div>
    </div>
  );
};

export default SearchPropertyForm;
