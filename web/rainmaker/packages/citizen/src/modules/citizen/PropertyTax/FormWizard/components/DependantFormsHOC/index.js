import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../GenericForm";

const DependantFormsHOC = ({ formKeys, combination, basePath }) => {
  return formKeys.map((formKey, index) => {
    console.log(`${basePath}/${combination}/${formKey}`);
    let DependantForm = formHoc({ formKey: formKey, formConfigPath: `${basePath}/${combination}/${formKey}` })(GenericForm);
    return (
      <div key={index}>
        <DependantForm />
      </div>
    );
  });
};

export default DependantFormsHOC;
