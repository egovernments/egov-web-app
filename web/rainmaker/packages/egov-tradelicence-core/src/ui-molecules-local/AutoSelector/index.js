import React, { Component } from "react";
import { connect } from "react-redux";
import { AutoSuggest } from "../../ui-atoms-local";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

// import "./index.css";

class AutoSuggestor extends Component {
  onSelect = value => {
    const { prepareFinalObject, jsonPath } = this.props;
    prepareFinalObject(jsonPath, value.value);
  };

  render() {
    return (
      <div>
        <AutoSuggest onSelect={this.onSelect} {...this.props} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (path, value) =>
      dispatch(prepareFinalObject(path, value))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AutoSuggestor);
