import React, { Component } from "react";
import { connect } from "react-redux";
import { AutoSuggest } from "../../ui-atoms-local";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

// import "./index.css";

class AutoSuggestor extends Component {
  onSelect = value => {
    const { prepareFinalObject, jsonPath } = this.props;
    prepareFinalObject(jsonPath, value.value);
  };

  render() {
    const { value, fieldValue, preparedFinalObject, ...rest } = this.props;
    let _fieldValue = fieldValue;
    // if (value) {
    //   _fieldValue = {};
    // }
    // console.log(fieldValue);
    return (
      <div>
        <AutoSuggest
          onSelect={this.onSelect}
          //   value={value}
          fieldValue={_fieldValue}
          {...rest}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops) => {
  let fieldValue = "";
  let value = "";
  const { jsonPath } = ownprops;
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  if (jsonPath) {
    value = get(preparedFinalObject, jsonPath);
    let jP = jsonPath.split(".");
    jP.pop();
    jP = jP.join(".") + ".name";
    let label = get(preparedFinalObject, jP);
    fieldValue = { value: value, label: label };
  }
  return { fieldValue, value, preparedFinalObject };
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
)(AutoSuggestor);
