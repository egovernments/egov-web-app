import React from "react";
import { connect } from "react-redux";
import { TextfieldWithIcon } from "../../ui-molecules";
import MenuItem from "@material-ui/core/MenuItem";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { getTranslatedLabel, transformById } from "../../ui-utils/commons";

const localizationLabels = JSON.parse(
  window.localStorage.getItem("localization_en_IN")
);

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

class TextFieldContainer extends React.Component {

  render() {
    let {
      label = {},
      placeholder = {},
      jsonPath,
      iconObj = {},
      value,
      dropdownData,
      data = [],
      optionValue = "code",
      optionLabel = "code",
      sourceJsonPath,
      state,
      dispatch,
      ...rest
    } = this.props;

    if (!isEmpty(iconObj) && iconObj.onClickDefination) {
      iconObj={
        ...iconObj,
        onClick : () => iconObj.onClickDefination.callBack(state, dispatch)
      }
    }
    let transfomedKeys = transformById(localizationLabels, "code");
    let translatedLabel = getLocaleLabelsforTL(
      label.labelName,
      label.labelKey,
      transfomedKeys
    );
    let translatedPlaceholder = getLocaleLabelsforTL(
      placeholder.labelName,
      placeholder.labelKey,
      transfomedKeys
    );

    if (dropdownData.length > 0) {
      return (
        <TextfieldWithIcon
          label={translatedLabel}
          placeholder={translatedPlaceholder}
          iconObj={iconObj}
          value={value ? value : translatedPlaceholder}
          {...rest}
        >
          <MenuItem value={translatedPlaceholder} disabled>
            {translatedPlaceholder}
          </MenuItem>
          {dropdownData.map((option, key) => (
            <MenuItem key={key} value={option.value}>
              {getLocaleLabelsforTL(
                option.value,
                `TL_${option.value}`,
                transfomedKeys
              )}
            </MenuItem>
          ))}
        </TextfieldWithIcon>
      );
    } else {
      return (
        <TextfieldWithIcon
          label={translatedLabel}
          placeholder={translatedPlaceholder}
          iconObj={iconObj}
          value={value}
          {...rest}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownprops) => {
  const {
    jsonPath,
    value,
    select,
    data,
    optionValue,
    optionLabel,
    sourceJsonPath
  } = ownprops;
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const fieldValue =
    value === undefined ? get(preparedFinalObject, jsonPath) : value;
  let dropdownData = [];
  if (select) {
    const constructDropdown = dt => {
      return dt.map(d => {
        return {
          value: d[optionValue],
          label: d[optionLabel]
        };
      });
    };
    if (data && data.length > 0) {
      dropdownData = constructDropdown(data || []);
    } else if (sourceJsonPath) {
      dropdownData = constructDropdown(
        get(preparedFinalObject, sourceJsonPath, [])
      );
    }
  }
  return { value: fieldValue, dropdownData, state };
};

export default connect(mapStateToProps)(TextFieldContainer);
