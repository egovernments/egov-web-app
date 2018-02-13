import React from "react";
import { connect } from "react-redux";
import { SelectField } from "../containers";
import { TextField } from "../components";
import { fetchDropDownData, handleChange } from "../actions/framework";

const Field = ({ field, actionName, handleChange, ...rest }) => {
  const { type, width, label } = field;

  const onChange = event => {
    const value = event.target.value;
    handleChange({ ...field, value });
  };

  const renderField = () => {
    switch (type) {
      case "text":
        return <TextField onChange={onChange} {...rest} />;

      case "dropdown":
        return <SelectField onChange={onChange} {...rest} field={field} />;

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
  const { field } = props;
  const { target, type } = field;
  const fieldProperty = framework.fields[target];
  const hide = fieldProperty ? fieldProperty.hide : "false";
  const disabled = fieldProperty ? fieldProperty.disabled : false;
  const dropDownData = framework.dropDownData[target];
  const errorMessage = fieldProperty ? fieldProperty.errorMessage : "";

  const mappedProps = {
    value: framework.form[target] || "",
    hide,
    disabled,
    errorMessage
  };

  if (type === "dropdown") {
    mappedProps["dropDownData"] = dropDownData;
  }

  return mappedProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
