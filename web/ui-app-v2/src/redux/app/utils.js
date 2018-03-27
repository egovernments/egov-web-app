import {transformById} from "../../utils/commons";

export const transformLocalizationLabels = (localizationLabels) => {
  let labelsById=transformById(localizationLabels,"code");
  localStorage.setItem("localization",JSON.stringify(labelsById));
  return labelsById;
};

export const initLocalizationLabels = () => {
  let localizationLabels;
  if ("localization" in window.localStorage) {
    localizationLabels = localStorage.getItem("localization");
    try {
      localizationLabels = JSON.parse(localizationLabels);
      localizationLabels = transformLocalizationLabels(localizationLabels);
    } catch (error) {
      localizationLabels = {};
    }
  }
  return localizationLabels;
};
