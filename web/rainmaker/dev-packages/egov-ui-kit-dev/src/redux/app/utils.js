import { transformLocalizationLabels } from "egov-ui-kit/utils/commons";

export const initLocalizationLabels = (locale) => {
  let localizationLabels;
  try {
    localizationLabels = window.localStorage.getItem(`localization_${locale}`);
    localizationLabels = JSON.parse(localizationLabels);
    localizationLabels = transformLocalizationLabels(localizationLabels);
  } catch (error) {
    localizationLabels = {};
  }

  return localizationLabels;
};
