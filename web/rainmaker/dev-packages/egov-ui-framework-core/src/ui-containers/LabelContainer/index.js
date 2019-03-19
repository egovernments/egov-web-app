import React from "react";
import { Label } from "../../ui-atoms";
import get from "lodash/get";
import { connect } from "react-redux";
import {
  getTranslatedLabel,
  transformById,
  getLocaleLabels,
  appendModulePrefix
} from "../../ui-utils/commons";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";
import isEmpty from "lodash/isEmpty";

// const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
//   if (labelKey) {
//     let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
//     if (!translatedLabel || labelKey === translatedLabel) {
//       return label;
//     } else {
//       return translatedLabel;
//     }
//   } else {
//     return label;
//   }
// };

const localizationLabels = JSON.parse(getLocalization("localization_en_IN"));

// const appendModulePrefix = value => {
//   if (window.location.pathname.includes("hrms")) {
//     return `HR_${value}`;
//   } else {
//     return `TL_${value}`;
//   }
// };

const hasModulePrefix = label => {
  return (
    label.startsWith("TL_") ||
    label.startsWith("WF_") ||
    label.startsWith("HR_")
  );
};

class LabelContainer extends React.Component {
  render() {
    let { labelName, labelKey, localePrefix, fieldValue, ...rest } = this.props;
    let transfomedKeys = transformById(localizationLabels, "code");
    let translatedLabel = getLocaleLabels(
      labelName,
      // labelKey && typeof labelKey === "string"
      //   ? hasModulePrefix(labelKey)
      //     ? labelKey
      //     : appendModulePrefix(labelKey)
      //   : labelKey,
      labelKey,
      transfomedKeys
    );

    if (typeof fieldValue === "boolean") {
      fieldValue = fieldValue ? "Yes" : "No";
    }

    let fieldLabel =
      typeof fieldValue === "string"
        ? getLocaleLabels(
            fieldValue,
            // fieldValue && hasModulePrefix(fieldValue)
            //   ? fieldValue
            //   : appendModulePrefix(fieldValue),

            localePrefix && !isEmpty(localePrefix)
              ? appendModulePrefix(fieldValue, localePrefix)
              : fieldValue,
            transfomedKeys
          )
        : fieldValue;
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
