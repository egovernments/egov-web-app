import React from "react";
import { Label } from "../../ui-atoms";
import get from "lodash/get";
import { connect } from "react-redux";
import { getTranslatedLabel, transformById } from "../../ui-utils/commons";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";

const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

const localizationLabels = JSON.parse(getLocalization("localization_en_IN"));

class LabelContainer extends React.Component {
  render() {
    let { labelName, labelKey, fieldValue, ...rest } = this.props;
    let transfomedKeys = transformById(localizationLabels, "code");
    let translatedLabel = getLocaleLabelsforTL(
      labelName,
      labelKey && typeof labelKey === "string"
        ? labelKey.startsWith("TL_") || labelKey.startsWith("WF_")
          ? labelKey
          : `TL_${labelKey}`
        : labelKey,
      transfomedKeys
    );

    if (typeof fieldValue === "boolean") {
      fieldValue = fieldValue ? "Yes" : "No";
    }
    let fieldLabel = getLocaleLabelsforTL(
      fieldValue,
      fieldValue &&
        (fieldValue.startsWith("TL_") || fieldValue.startsWith("WF_"))
        ? fieldValue
        : `TL_${fieldValue}`,
      transfomedKeys
    );
    return (
      <Label
        data-localization={
          labelKey ? labelKey : labelName ? labelName : fieldLabel
        }
        label={fieldValue ? fieldLabel : translatedLabel}
        {...rest}
      />
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  let fieldValue = "";
  const { jsonPath, callBack } = ownprops;
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  if (jsonPath) {
    fieldValue = get(preparedFinalObject, jsonPath);
    if (fieldValue && callBack && typeof callBack === "function") {
      fieldValue = callBack(fieldValue);
    }
  }
  return { fieldValue };
};

export default connect(
  mapStateToProps,
  {}
)(LabelContainer);
