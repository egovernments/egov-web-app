import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { TextField, DropDown, DatePicker } from "components";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import { translate } from "./commons/common";
import AutoComplete from "material-ui/AutoComplete";
import Label from "egov-ui-kit/utils/translationNode";

export default class ShowField extends Component {
  constructor(props) {
    super(props);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      maxDate: maxDate,
    };
  }

  renderFields = (obj) => {
    let des = translate(obj.label);
    let { maxDate } = this.state;
    let description = des;

    let dropDownData = [];

    if (typeof obj.defaultValue == "object") {
      for (var variable in obj.defaultValue) {
        dropDownData.push({
          value: variable,
          label: obj.defaultValue[variable],
        });
      }
    }

    switch (obj.type) {
      case "string":
        return (
          <Col xs={12} sm={4} md={3} lg={3}>
            <TextField
              value={this.props.value}
              id={obj.label.split(".").join("-")}
              fullWidth={true}
              disabled={obj.disabled ? true : false}
              floatingLabelFixed={true}
              floatingLabelText={
                <span>
                  {description} <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </span>
              }
              onChange={(e) => this.props.handler(e, obj.name, obj.isMandatory ? true : false, "")}
            />
          </Col>
        );
      case "number":
        return (
          <Col xs={12} sm={4} md={3} lg={3}>
            <TextField
              value={this.props.value}
              id={obj.label.split(".").join("-")}
              fullWidth={true}
              floatingLabelFixed={true}
              floatingLabelText={
                <span>
                  {description} <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </span>
              }
              onChange={(e) => this.props.handler(e, obj.name, obj.isMandatory ? true : false, /^[+-]?\d+(\.\d+)?$/)}
            />
          </Col>
        );
      case "date":
        return (
          <Col xs={12} sm={4} md={3} lg={3}>
            <DatePicker
              autoOk={true}
              className="custom-form-control-for-textfield"
              id={obj.label.split(".").join("-")}
              fullWidth={true}
              floatingLabelFixed={true}
              floatingLabelText={
                <div>
                  <Label label={description} fontSize="18px" color="#03b0c6" />
                  <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </div>
              }
              maxDate={maxDate}
              value={typeof obj.value == "object" ? obj.value : {}}
              onChange={(first, object) => {
                let e = { target: { value: object } };
                this.props.handler(e, obj.name, obj.isMandatory ? true : false, "");
              }}
            />
          </Col>
        );
      case "epoch":
        return (
          <Col xs={12} sm={4} md={4} lg={4}>
            <DatePicker
              className="custom-form-control-for-textfield"
              id={obj.label.split(".").join("-")}
              autoOk={true}
              fullWidth={true}
              floatingLabelFixed={true}
              maxDate={maxDate}
              floatingLabelText={
                <div>
                  <Label className="show-field-label" label={description} fontSize="18px" color="#03b0c6" />
                  <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </div>
              }
              hintText="dd/mm/yy"
              value={obj.value ? obj.value : {}}
              errorText={this.props.dateField ? (obj.name === this.props.dateField ? this.props.dateError : "") : ""}
              formatDate={(date) => {
                let dateObj = new Date(date);
                let year = dateObj.getFullYear();
                let month = dateObj.getMonth() + 1;
                let dt = dateObj.getDate();
                dt = dt < 10 ? "0" + dt : dt;
                month = month < 10 ? "0" + month : month;
                return dt + "-" + month + "-" + year;
              }}
              onChange={(first, object) => {
                let e = { target: { value: object } };
                this.props.handler(e, obj.name, obj.isMandatory ? true : false, "");
              }}
            />
          </Col>
        );
      case "singlevaluelist":
        console.log(obj.value);
        return (
          <Col xs={12} sm={4} md={4} lg={4}>
            <DropDown
              className="custom-form-control-for-select"
              hintText="Select"
              disabled={obj.disabled ? true : false}
              id={obj.label.split(".").join("-")}
              fullWidth={true}
              dropDownMenuProps={{ targetOrigin: { horizontal: "left", vertical: "bottom" } }}
              floatingLabelFixed={true}
              floatingLabelText={
                <span>
                  {description} <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </span>
              }
              value={typeof obj.value == "undefined" ? "" : obj.value}
              onChange={(event, key, value) => {
                let e = { target: { value } };
                this.props.handler(e, obj.name, obj.isMandatory ? true : false, "");
              }}
              maxHeight={200}
              dropDownData={dropDownData}
            />
          </Col>
        );

      case "singlevaluelistac":
        const dataSourceConfig = { text: "value", value: "key" };
        return (
          <Col xs={12} sm={4} md={3} lg={3}>
            <AutoComplete
              className="custom-form-control-for-textfield"
              floatingLabelStyle={{ color: obj.disabled ? "#A9A9A9" : "#696969", fontSize: "20px", whiteSpace: "nowrap" }}
              inputStyle={{ color: "#5F5C57" }}
              floatingLabelFixed={true}
              fullWidth={true}
              style={{ display: "inline-block" }}
              filter={(searchText, key) => {
                return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
              }}
              floatingLabelText={
                <span>
                  {description} <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </span>
              }
              listStyle={{ maxHeight: 100, overflow: "auto" }}
              onNewRequest={(value) => {
                const e = { target: { value: value.key } };
                this.props.handler(e, obj.name, obj.isMandatory ? true : false, "");
              }}
              dataSource={dropDownData}
              dataSourceConfig={dataSourceConfig}
              openOnFocus={true}
            />
          </Col>
        );

      case "url":
        console.log(`Is object mandatory ${obj.isMandatory}`);

        return (
          <Col xs={12} sm={4} md={3} lg={3}>
            <SelectField
              className="custom-form-control-for-select"
              hintText="Select"
              underlineDisabledStyle={{ background: "blue" }}
              disabled={obj.disabled ? true : false}
              id={obj.label.split(".").join("-")}
              fullWidth={true}
              dropDownMenuProps={{ targetOrigin: { horizontal: "left", vertical: "bottom" } }}
              floatingLabelFixed={true}
              floatingLabelText={
                <span>
                  {description} <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </span>
              }
              value={typeof obj.value == "undefined" ? "" : obj.value}
              onChange={(event, key, value) => {
                let e = { target: { value } };
                this.props.handler(e, obj.name, obj.isMandatory ? true : false, "");
              }}
              maxHeight={200}
            >
              {dropDownData.map((dd, index) => <MenuItem value={translate(dd.key)} key={index} primaryText={translate(dd.value)} />)}
            </SelectField>
          </Col>
        );

      case "multivaluelist":
        return (
          <Col xs={12} sm={4} md={3} lg={3}>
            <SelectField
              className="custom-form-control-for-select"
              hintText="Select"
              id={obj.label.split(".").join("-")}
              fullWidth={true}
              multiple={true}
              dropDownMenuProps={{ targetOrigin: { horizontal: "left", vertical: "bottom" } }}
              floatingLabelFixed={true}
              floatingLabelText={
                <span>
                  {description} <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </span>
              }
              value={typeof obj.value == "undefined" ? "" : obj.value}
              onChange={(event, key, value) => {
                let e = { target: { value } };
                this.props.handler(e, obj.name, obj.isMandatory ? true : false, "");
              }}
              maxHeight={200}
            >
              {dropDownData.map((dd, index) => (
                <MenuItem
                  insetChildren={true}
                  checked={obj.value && obj.value.indexOf(dd.key) > -1 ? true : false}
                  value={translate(dd.key)}
                  key={index}
                  primaryText={translate(dd.value)}
                />
              ))}
            </SelectField>
          </Col>
        );

      case "checkbox":
        return (
          <Col xs={12} md={3}>
            <Checkbox
              id={obj.label.split(".").join("-")}
              label={
                <span>
                  {description} <span style={{ color: "#FF0000" }}>{obj.isMandatory ? " *" : ""}</span>
                </span>
              }
              checked={obj.value ? obj.value : false}
              onCheck={(e) => this.props.handler({ target: { value: e.target.checked } }, obj.name, obj.isMandatory ? true : false, "")}
            />
          </Col>
        );

      default:
        return <div />;
    }
  };
  render() {
    console.log(this.props.obj);
    return this.renderFields(this.props.obj);
  }
}
