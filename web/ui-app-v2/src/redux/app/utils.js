import { transformById } from "utils/commons";

export const transformLocalizationLabels = (localizationLabels) => {
  let labelsById = transformById(localizationLabels, "code");
  return labelsById;
};

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
