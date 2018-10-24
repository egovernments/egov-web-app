import React, { Component } from "react";
import { connect } from "react-redux";
import { AutoSuggest } from "../../ui-atoms-local";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

class AutoSuggestor extends Component {
  onSelect = value => {
    const { prepareFinalObject, jsonPath, onChange } = this.props;
    let e = { target: { value: value } };
    onChange(e);
    prepareFinalObject(jsonPath, value.value);
  };

  render() {
    const { value, preparedFinalObject, ...rest } = this.props;
    return (
      <div>
        <AutoSuggest onSelect={this.onSelect} value={value} {...rest} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops) => {
  const { jsonPath, value } = ownprops;
  return { value, jsonPath };
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
