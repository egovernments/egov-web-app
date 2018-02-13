import React from "react";
import { connect } from "react-redux";
import { SelectField } from "../containers";
import { Label, Checkbox, TextField, TextArea } from "../components";
import { fetchDropDownData, handleChange } from "../actions/framework";

const Field = ({ field, actionName, handleChange, ...rest }) => {
  const { type, width, label } = field;

  const onChange = event => {
    let value;
    if (type == "checkbox") {
      value = event.target.checked === true ? true : false;
    } else {
      value = event.target.value;
    }
    handleChange({ ...field, value });
  };

  const renderViewField = () => {
    const { value: label } = this.props;
    return <Label label={label} />;
  };

  const renderField = () => {
    switch (type) {
      case "text":
        return <TextField onChange={onChange} {...rest} />;

      case "dropdown":
        return <SelectField onChange={onChange} {...rest} field={field} />;

      case "checkbox":
        return <Checkbox {...rest} onChange={onChange} />;

      case "textarea":
        return <TextArea {...rest} onChange={onChange} />;

      default:
        break;
    }
  };

  return (
    <div className={`col-lg-${width}`}>
      <label>{label}</label>
      {renderField()}
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  const dispatchers = {};
  const { type } = props.field;

  dispatchers["handleChange"] = (target, value) =>
    dispatch(handleChange(target, value));

  if (type == "dropdown") {
    dispatchers["fetchDropDownData"] = (dataSource, field) =>
      dispatch(fetchDropDownData(dataSource, field));
  }
  return dispatchers;
};

const mapStateToProps = (state, props) => {
  const { framework } = state;
  const { actionName } = framework.actionName;
  const { field } = props;
  const { target, type } = field;
  const fieldProperty = framework.fields[target];
  const hide = fieldProperty ? fieldProperty.hide : "false";
  const disabled = fieldProperty ? fieldProperty.disabled : false;
  const dropDownData = framework.dropDownData[target];
  const errorMessage = fieldProperty ? fieldProperty.errorMessage : "";
  const value = framework.form[target] || "";

  const mappedProps = {
    value,
    actionName,
    hide,
    disabled,
    errorMessage
  };

  if (type === "checkbox") {
    mappedProps["checked"] = value;
  }

  if (type === "dropdown") {
    mappedProps["dropDownData"] = dropDownData;
  }

  return mappedProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
