import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { SelectField } from "../containers";
import { Label, Checkbox, TextField, TextArea } from "../components";
import { fetchDropDownData, handleChange } from "../actions/framework";

const Field = ({ moduleAction, field, handleChange, ...rest }) => {
  const { type, width, label } = field;

  const onChange = event => {
    const value = event.target.value;
    handleChange({ ...field, value });
  };

  const onCheck = (event, isInputChecked) => {
    handleChange({ ...field, value: isInputChecked });
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
        return (
          <SelectField
            moduleAction={moduleAction}
            handleChange={handleChange}
            {...rest}
            field={field}
          />
        );

      case "checkbox":
        return <Checkbox {...rest} field={field} onCheck={onCheck} />;

      case "textarea":
        return <TextArea {...rest} field={field} onChange={onChange} />;

      case "label":
        return <Label {...rest} value="Toggle Field" />;

      default:
        break;
    }
  };

  return (
    <div
      style={{ height: "110px" }}
      className={`col-md-${width} col-sm-${width} col-xs-12 col-lg-${width}`}
    >
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
  const { field } = props;
  const { target, jsonPath, type } = field;
  const fieldProperty = framework.fields[target];
  const hide = fieldProperty ? fieldProperty.hide : field.hide;
  const disabled = fieldProperty ? fieldProperty.disabled : field.disabled;
  const dropDownData = framework.dropDownData[target] || field.defaultOptions;
  const errorMessage = fieldProperty ? fieldProperty.errorMessage : "";
  const value = _.get(framework.form, jsonPath) || "";

  const mappedProps = {
    value,
    hide,
    disabled,
    errorMessage
  };

  if (type === "checkbox") {
    mappedProps["checked"] = value || false;
  }

  if (type === "dropdown") {
    mappedProps["dropDownData"] = dropDownData;
  }

  return mappedProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
