import React from "react";
import { Label } from "mihy-ui-framework/ui-atoms";
import {
  getTranslatedLabel,
  transformById
} from "../../ui-config/screens/specs/utils/index";

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

class LabelContainer extends React.Component {
  render() {
    let { label, labelKey, ...rest } = this.props;
    const localizationLabels = JSON.parse(
      window.localStorage.getItem("localization_en_IN")
    );
    let transfomedKeys = transformById(localizationLabels, "code");
    let translatedLabel = getLocaleLabelsforTL(label, labelKey, transfomedKeys);

    return <Label label={translatedLabel} {...rest} />;
  }
}

export default LabelContainer;
