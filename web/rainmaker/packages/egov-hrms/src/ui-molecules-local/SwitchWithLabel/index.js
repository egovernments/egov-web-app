import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import Switch from "../../ui-atoms-local/Switch";
import get from "lodash/get";
import { connect } from "react-redux";
import "./index.css";

class SwitchWithLabel extends Component {
  state = {
    checked: false,
    value: false
  };

  onChange = (event, checked) => {
    const { prepareFinalObject, jsonPath } = this.props;
    this.setState({
      checked: checked,
      value: event.target.checked
    });
    prepareFinalObject(jsonPath, event.target.checked);
  };

  render() {
    const { items, FormControlProps, SwitchProps, switchValue } = this.props;
    return (
      <FormGroup>
        {items.map((item, index) => {
          return (
            <FormControlLabel
              className={"form-control-switch"}
              key={`form-${index}`}
              control={
                <Switch
                  value={switchValue ? switchValue : this.state.value}
                  checked={switchValue ? switchValue : this.state.checked}
                  onChange={this.onChange}
                  {...SwitchProps}
                />
              }
              label={item.label}
              {...FormControlProps}
            />
          );
        })}
      </FormGroup>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { jsonPath } = ownprops;
  const switchValue = get(preparedFinalObject, jsonPath);
  return { switchValue };
};

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (path, value) =>
      dispatch(prepareFinalObject(path, value))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchWithLabel);
