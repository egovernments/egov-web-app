import React, { Component } from "react";
import { connect } from "react-redux";
import { AutoSuggest } from "../../ui-atoms-local";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import {
  transformById,
  getLocaleLabels
} from "mihy-ui-framework/ui-utils/commons";

const localizationLabels = JSON.parse(
  window.localStorage.getItem("localization_en_IN")
);

class AutoSuggestor extends Component {
  onSelect = value => {
    const { prepareFinalObject, jsonPath, onChange } = this.props;
    // let e = { target: { value: value } };
    console.log("auto", { target: { value } });
    onChange({ target: { value } });
    prepareFinalObject(jsonPath, value.value);
  };

  render() {
    const {
      value,
      preparedFinalObject,
      label,
      placeholder,
      ...rest
    } = this.props;
    let transfomedKeys = transformById(localizationLabels, "code");
    let translatedLabel = getLocaleLabels(
      label.labelName,
      label.labelKey,
      transfomedKeys
    );
    let translatedPlaceholder = getLocaleLabels(
      placeholder.labelName,
      placeholder.labelKey,
      transfomedKeys
    );

    return (
      <div>
        <AutoSuggest
          onSelect={this.onSelect}
          value={value}
          label={translatedLabel}
          placeholder={translatedPlaceholder}
          {...rest}
        />
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
