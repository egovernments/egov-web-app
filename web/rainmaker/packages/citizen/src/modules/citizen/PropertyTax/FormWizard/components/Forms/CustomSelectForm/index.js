import React from "react";
import Field from "egov-ui-kit/utils/field";
import field from "egov-ui-kit/utils/field";

const getDropDownData = (noFloors) => {
  return [...Array(parseInt(noFloors))].map((item, key) => {
    return { label: key + 1, value: key + 1 };
  });
};

const CustomSelectForm = ({ handleFieldChange, form, noFloors }) => {
  let fields = form.fields || {};
  let floorName = fields.floorName;
  if (floorName) {
    floorName.value = "Base";
    floorName.dropDownData = [{ label: "Basement", value: "Base" }, { label: "Ground Floor", value: "GF" }];
    floorName.dropDownData = [...floorName.dropDownData, ...getDropDownData(noFloors - 1)];
  }

  return (
    <div style={{ marginLeft: "30px" }}>
      <Field fieldKey="floorName" field={fields.floorName} handleFieldChange={handleFieldChange} />
    </div>
  );
};

export default CustomSelectForm;
