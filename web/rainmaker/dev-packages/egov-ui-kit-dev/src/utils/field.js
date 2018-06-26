import React from "react";
import { TextField, MobileNumberField, SingleCheckbox, DropDown, Label } from "components";

// const ToolTip = ({ placement, show, title, id }) => {
//   return <Tooltip enterDelay={300} id={id} leaveDelay={300} open={show} placement={placement} title={title} />;
// };

const Field = ({ fieldKey, handleFieldChange, field = {}, ...rest }) => {
  const renderField = () => {
    const { type, tooltip, label, ...fieldProps } = field;
    switch (type) {
      case "textfield":
      case "textarea":
        return <TextField {...rest} {...fieldProps} onChange={(e, value) => handleFieldChange(fieldKey, value)} multiLine={type === "textarea"} />;
      case "mobilenumber":
        return <MobileNumberField {...rest} {...fieldProps} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      case "number":
      case "password":
        return <TextField {...rest} {...fieldProps} type={type} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      case "checkbox":
        return (
          <SingleCheckbox {...rest} {...fieldProps} style={{ marginTop: "27px" }} onCheck={(e) => handleFieldChange(fieldKey, e.target.checked)} />
        );
      case "label":
        return <Label {...rest} {...fieldProps} />;
      case "singleValueList":
        return (
          <DropDown
            {...rest}
            {...fieldProps}
            dropDownData={fieldProps.dropDownData || []}
            onChange={(e, value, selectedValue) => handleFieldChange(fieldKey, selectedValue)}
          />
        );
      default:
        return null;
    }
  };

  return renderField();
};

export default Field;
