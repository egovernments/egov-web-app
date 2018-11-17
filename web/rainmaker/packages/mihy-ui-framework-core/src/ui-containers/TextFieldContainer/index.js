import React from "react";
import { connect } from "react-redux";
import { TextfieldWithIcon, Tooltip } from "../../ui-molecules";
import MenuItem from "@material-ui/core/MenuItem";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {
  transformById,
  epochToYmd,
  getLocaleLabels
} from "../../ui-utils/commons";
import { getLocaleLabelsforTL } from "../../ui-config/screens/specs/utils";

const localizationLabels = JSON.parse(
  window.localStorage.getItem("localization_en_IN")
);

class TextFieldContainer extends React.Component {
  componentDidMount() {
    const { hasDependant, onChange, value } = this.props;
    if (hasDependant && value) {
      onChange({ target: { value } });
    }
  }

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
      index,
      componentJsonpath,
      state,
      infoIcon,
      dispatch,
      title,
      ...rest
    } = this.props;

    if (!isEmpty(iconObj) && iconObj.onClickDefination) {
      iconObj = {
        ...iconObj,
        onClick: () =>
          iconObj.onClickDefination.callBack(state, dispatch, {
            index,
            componentJsonpath
          })
      };
    }
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
            <div className="select-field-placeholder">
              {translatedPlaceholder}
            </div>
          </MenuItem>
          {dropdownData.map((option, key) => (
            <MenuItem key={key} value={option.value}>
              {getLocaleLabels(
                option.value,
                `TL_${option.value}`,
                transfomedKeys
              )}
            </MenuItem>
          ))}
        </TextfieldWithIcon>
      );
    } else {
      return this.props.select ? (
        <div>
          <TextfieldWithIcon
            label={translatedLabel}
            placeholder={translatedPlaceholder}
            iconObj={iconObj}
            value={value ? value : translatedPlaceholder}
            {...rest}
          >
            <MenuItem value={translatedPlaceholder} disabled>
              <div className="select-field-placeholder">
                {translatedPlaceholder}
              </div>
            </MenuItem>
          </TextfieldWithIcon>
          {title &&
            !isEmpty(title) &&
            infoIcon && <Tooltip val={title} icon={infoIcon} />}
        </div>
      ) : (
        <div>
          <TextfieldWithIcon
            label={translatedLabel}
            placeholder={translatedPlaceholder}
            iconObj={iconObj}
            value={
              this.props.type === "date" && !value
                ? translatedPlaceholder
                : value
            }
            {...rest}
          />
          {title &&
            !isEmpty(title) &&
            infoIcon && <Tooltip val={title} icon={infoIcon} />}
        </div>
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
  let fieldValue =
    value === undefined ? get(preparedFinalObject, jsonPath) : value;
  // Convert epoch to YYYY-MM-DD and set date picker value
  if (ownprops.type && ownprops.type === "date")
    fieldValue = epochToYmd(fieldValue);
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
