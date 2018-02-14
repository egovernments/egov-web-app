import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { SelectField } from "../containers";
import { Label, Checkbox, TextField, TextArea } from "../components";
import { fetchDropDownData, handleChange } from "../actions/framework";

const Field = ({ field, moduleAction, handleChange, ...rest }) => {
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
    return (
      <div>
        <label>{label}</label>
        <Label {...rest} />
      </div>
    );
  };

  const renderField = () => {
    switch (type) {
      case "text":
        return <TextField onChange={onChange} field={field} {...rest} />;

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
      {moduleAction === "view" ? renderViewField() : renderField()}
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
  const { moduleAction } = framework;
  const { field } = props;
  const { target, jsonPath, type } = field;
  const fieldProperty = framework.fields[target];
  const hide = fieldProperty ? fieldProperty.hide : field.hide;
  const disabled = fieldProperty ? fieldProperty.disabled : field.disabled;
  const dropDownData = framework.dropDownData[target];
  const errorMessage = fieldProperty ? fieldProperty.errorMessage : "";
  const value = _.get(framework.form, jsonPath) || "";

  const mappedProps = {
    value,
    moduleAction,
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
